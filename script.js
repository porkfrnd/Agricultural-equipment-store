/**
 * AgriGear Pro X - Central Core Logic System Module
 * Deployed Inventory Registry Array Matrix
 */
const PRODUCTS = [
    { id: 'shovel', name: 'Iron Shovel', price: 2000, originalPrice: 2500, stock: 12, img: 'resources/shovel.webp', classification: 'tool', tag: 'Essential Tool' },
    { id: 'tractor', name: 'Delux Tractor', price: 180000, originalPrice: 210000, stock: 2, img: 'resources/tractor.avif', classification: 'machine', tag: 'Heavy Machine' },
    { id: 'bucket', name: 'Iron Bucket', price: 1700, originalPrice: null, stock: 45, img: 'resources/bucket.jpg', classification: 'utility', tag: 'Utility Asset' },
    { id: 'sprinkler', name: 'Water Sprinkler', price: 4500, originalPrice: 5500, stock: 5, img: 'resources/sprinkler.avif', classification: 'irrigation', tag: 'Irrigation' },
    { id: 'sensor', name: 'Soil Moisture Sensor', price: 9800, originalPrice: 12000, stock: 8, img: 'resources/sensor.jpg', classification: 'smart', tag: 'Smart Tech' },
    { id: 'seed', name: 'Pumpkin Seed (320g)', price: 1600, originalPrice: 1900, stock: 3, img: 'resources/seed.webp', classification: 'seeds', tag: 'Organic Seeds' }
];

// Global Operational Application State Constants
let cart = [];

/**
 * Lifecycle Mounting Phase Core Entry Routing
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeThemePreference();
    initializeLocalStateRegistry();
    triggerAsyncSkeletonLoader();
});

/**
 * Dual-Theme Preference Persistence Routines
 */
function initializeThemePreference() {
    const savedTheme = localStorage.getItem('agrigear_theme_mode') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetedTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetedTheme);
    localStorage.setItem('agrigear_theme_mode', targetedTheme);
    triggerFloatingNotification(`Swapped to ${targetedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}.`);
}

/**
 * LocalStorage State Serialization Persistence Loops
 */
function synchronizeStateToDevice() {
    localStorage.setItem('agrigear_pro_x_payload', JSON.stringify(cart));
}

function initializeLocalStateRegistry() {
    const localPayload = localStorage.getItem('agrigear_pro_x_payload');
    if (localPayload) {
        try {
            cart = JSON.parse(localPayload);
            updateCartUI();
            setTimeout(() => triggerFloatingNotification('Cart restored from local device storage.'), 600);
        } catch (error) {
            console.error('State Registry Deserialization Interrupted:', error);
            cart = [];
        }
    }
}

/**
 * Network Delay Shimmer Automation Matrix Engine
 */
async function triggerAsyncSkeletonLoader() {
    const grid = document.getElementById('productGrid');
    
    // Inject Skeletons Into View Container
    grid.innerHTML = Array(6).fill().map(() => `
        <div class="skeleton-card"></div>
    `).join('');

    // Native Delay Simulation Timing Variable
    await new Promise(resolve => setTimeout(resolve, 950));

    // Clear Container and Map Genuine Elements
    filterAndRenderProducts();
}

/**
 * Reactive Content Filtering Engine (Search Metric + Select Option Array Matrix)
 */
function filterAndRenderProducts() {
    const searchString = document.getElementById('searchInput').value.toLowerCase().trim();
    const classificationToken = document.getElementById('filterInput').value;
    const grid = document.getElementById('productGrid');
    
    if (!grid) return;

    // Filter Validation Matching Logic
    const matchingProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchString);
        const matchesClassification = (classificationToken === 'all' || product.classification === classificationToken);
        return matchesSearch && matchesClassification;
    });

    if (matchingProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i data-lucide="alert-octagon" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--accent-amber);"></i>
                <h3>No inventory matches your search criteria</h3>
                <p style="margin-top: 8px; font-size: 0.95rem;">Try modifying search terms or categories.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Mapping Collection Structure Layout Output
    grid.innerHTML = matchingProducts.map(product => {
        
        // Price Calculation Logic
        let structuralPriceHTML = `<span class="price-current">Rs. ${product.price.toLocaleString()}</span>`;
        if (product.originalPrice) {
            const calculatedPercentage = Math.round((1 - (product.price / product.originalPrice)) * 100);
            structuralPriceHTML = `
                <div class="price-container">
                    <span class="price-old">Rs. ${product.originalPrice.toLocaleString()}</span>
                    <div>
                        <span class="price-current">Rs. ${product.price.toLocaleString()}</span>
                        <span class="save-badge">-${calculatedPercentage}%</span>
                    </div>
                </div>
            `;
        }

        // Structural Scarcity Warning Logic Flag
        let scarcityAlertHTML = '';
        if (product.stock <= 5) {
            scarcityAlertHTML = `
                <div class="stock-warning">
                    <i data-lucide="flame" style="width: 15px; height: 15px;"></i>
                    <span>High Demand: Only ${product.stock} items left!</span>
                </div>
            `;
        }

        return `
            <div class="product-card">
                <span class="badge">${product.tag}</span>
                <div class="img-container">
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='https://placehold.co/400x300/0b1329/f3f4f6?text=${encodeURIComponent(product.name)}'">
                </div>
                <div class="card-details">
                    <h3 class="title">${product.name}</h3>
                    <div class="price-row">
                        ${structuralPriceHTML}
                        <button class="add-to-cart-btn" onclick="executeCartInsertion('${product.id}')">
                            <span>Add to Cart</span>
                            <i data-lucide="plus" style="width: 16px; height: 16px; stroke-width: 3px;"></i>
                        </button>
                    </div>
                    ${scarcityAlertHTML}
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

/**
 * State Mutator Routines (Insertion & Structural Scaling Modulators)
 */
function executeCartInsertion(productId) {
    const targetProduct = PRODUCTS.find(p => p.id === productId);
    const discoveredItem = cart.find(item => item.id === productId);

    if (discoveredItem) {
        discoveredItem.quantity++;
    } else {
        cart.push({ ...targetProduct, quantity: 1 });
    }

    synchronizeStateToDevice();
    updateCartUI();
    triggerFloatingNotification(`Added ${targetProduct.name} to shopping cart.`);
}

function adjustCartItemVolume(productId, deltaModifier) {
    const targetedItem = cart.find(item => item.id === productId);
    if (!targetedItem) return;

    targetedItem.quantity += deltaModifier;
    if (targetedItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    synchronizeStateToDevice();
    updateCartUI();
}

/**
 * Core User Interface Mapping Reducer Synchronization Layer
 */
function updateCartUI() {
    const activeBadgeCount = cart.reduce((accumulation, runningItem) => accumulation + runningItem.quantity, 0);
    document.getElementById('cartBadge').innerText = activeBadgeCount;

    const listElementContainer = document.getElementById('cartItemsList');
    const primaryCheckoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        listElementContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
                <i data-lucide="shopping-bag" style="width: 52px; height: 52px; margin: 0 auto 16px auto; stroke-width: 1.2px;"></i>
                <p style="font-size: 0.95rem;">Your shopping cart is empty.</p>
            </div>
        `;
        if (primaryCheckoutBtn) primaryCheckoutBtn.disabled = true;
    } else {
        listElementContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img" alt="" onerror="this.src='https://placehold.co/100/0b1329/f3f4f6?text=Asset'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="adjustCartItemVolume('${item.id}', -1)"><i data-lucide="minus" style="width: 14px;"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="adjustCartItemVolume('${item.id}', 1)"><i data-lucide="plus" style="width: 14px;"></i></button>
                </div>
            </div>
        `).join('');
        if (primaryCheckoutBtn) primaryCheckoutBtn.disabled = false;
    }

    const calculatedSubtotalValue = cart.reduce((sum, currentItem) => sum + (currentItem.price * currentItem.quantity), 0);
    document.getElementById('cartSubtotal').innerText = `Rs. ${calculatedSubtotalValue.toLocaleString()}`;
    
    lucide.createIcons();
}

/**
 * Panel View Interface Animation Swapping Hooks
 */
function toggleCart(targetActiveState) {
    document.getElementById('cartDrawer').classList.toggle('active', targetActiveState);
}

function openCheckout() {
    toggleCart(false);
    document.getElementById('modalFormBody').style.display = 'block';
    document.getElementById('modalSuccessBody').style.display = 'none';
    
    const manifestSummaryBox = document.getElementById('modalOrderSummaryItems');
    manifestSummaryBox.innerHTML = cart.map(item => `
        <div class="preview-item-row">
            <span>${item.name} <small style="color: var(--text-muted); font-weight: 700;">(x${item.quantity})</small></span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    const calculatedGrandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('modalSummaryTotal').innerText = `Rs. ${calculatedGrandTotal.toLocaleString()}`;

    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

/**
 * Animated Floating Notification Utility Wrapper
 */
function triggerFloatingNotification(messageString) {
    const parentContainer = document.getElementById('toastContainer');
    const toastElement = document.createElement('div');
    toastElement.className = 'toast';
    toastElement.innerHTML = `<i data-lucide="info" style="width: 16px; color: var(--brand-emerald);"></i> <span>${messageString}</span>`;
    parentContainer.appendChild(toastElement);
    lucide.createIcons();

    setTimeout(() => {
        toastElement.style.animation = 'none';
        toastElement.offsetHeight; 
        toastElement.style.opacity = '0';
        toastElement.style.transform = 'translateY(-12px)';
        toastElement.style.transition = 'all 0.4s ease';
        setTimeout(() => toastElement.remove(), 400);
    }, 2800);
}

/**
 * Logistical Server Integration Processing Pipeline via Discord API
 */
async function handleOrderSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    
    const serverWebhookDestination = 'https://discord.com/api/webhooks/1492792645985112165/9mkbnBUVTxe9zzrWzDgphowiOxDt3Bq2CaMjgYQUZLgQOKs6cKtNthlp7R-QFpGZKH7d';
    const dispatchSubmissionBtn = document.getElementById('submitOrderBtn');
    
    const clientNameInput = document.getElementById('userName').value.trim();
    const clientEmailInput = document.getElementById('userEmail').value.trim();
    const clientPhoneInput = document.getElementById('userPhone').value.trim();
    const clientProvinceSelection = document.getElementById('province').value;
    const clientAddressInput = document.getElementById('address').value.trim();

    dispatchSubmissionBtn.disabled = true;
    dispatchSubmissionBtn.innerHTML = `<span>Processing Order Real-time...</span>`;

    const totalValuationSum = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const stringifiedManifestItems = cart.map(item => `• **${item.name}** × ${item.quantity} — (Rs. ${(item.price * item.quantity).toLocaleString()})`).join('\n');

    // Rich Embed Payload Schema
    const outboundPayloadSchema = {
        content: "🚜 **NEW ORDER SUBMISSION RECEIVED**",
        embeds: [{
            title: "Store Customer Invoice Profile",
            description: "A checkout form submission event has been successfully compiled into the routing log framework.",
            color: 1095809, 
            fields: [
                { name: "👨‍🌾 Customer Contact Profile", value: `**Name:** ${clientNameInput}\n**Phone Reference:** \`${clientPhoneInput}\`\n**Email Node:** ${clientEmailInput}`, inline: false },
                { name: "📍 Logistical Delivery Destination", value: `**Province Zone:** ${clientProvinceSelection}\n**Landmark/Address Node:** ${clientAddressInput}`, inline: false },
                { name: "📦 Product Selection Items Manifest", value: stringifiedManifestItems, inline: false },
                { name: "💰 Total Transacted Bill Value", value: `### Rs. ${totalValuationSum.toLocaleString()}`, inline: false }
            ],
            footer: { text: "AgriGear Pro X Gateway Automated Matrix Logs Channel" },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(serverWebhookDestination, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(outboundPayloadSchema)
        });

        if (response.ok) {
            cart = [];
            synchronizeStateToDevice();
            updateCartUI();
            
            document.getElementById('modalFormBody').style.display = 'none';
            document.getElementById('modalSuccessBody').style.display = 'block';
        } else {
            throw new Error('Target webhook API rejected structural matrix array compilation parameters.');
        }
    } catch (pipelineException) {
        alert('Transmission engine failure. Verify your gateway network routing lines.');
        console.error('Core Operational Pipeline Fault:', pipelineException);
    } finally {
        dispatchSubmissionBtn.disabled = false;
        dispatchSubmissionBtn.innerHTML = `<span>Confirm & Place Order</span> <i data-lucide="check-circle"></i>`;
        lucide.createIcons();
    }
}