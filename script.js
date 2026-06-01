// Centralized Data Layer Architecture with E-Commerce Psychology Tokens
const PRODUCTS = [
    { id: 'shovel', name: 'Iron Shovel', price: 2000, originalPrice: 2500, stock: 12, img: 'resources/shovel.webp', tag: 'Essential' },
    { id: 'tractor', name: 'Delux Tractor', price: 180000, originalPrice: 210000, stock: 2, img: 'resources/tractor.avif', tag: 'Heavy Machine' },
    { id: 'bucket', name: 'Iron Bucket', price: 1700, originalPrice: null, stock: 45, img: 'resources/bucket.jpg', tag: 'Utility' },
    { id: 'sprinkler', name: 'Water Sprinkler', price: 4500, originalPrice: 5500, stock: 5, img: 'resources/sprinkler.avif', tag: 'Irrigation' },
    { id: 'sensor', name: 'Soil Moisture Sensor', price: 9800, originalPrice: 12000, stock: 8, img: 'resources/sensor.jpg', tag: 'Smart Tech' },
    { id: 'seed', name: 'Pumpkin Seed (320g)', price: 1600, originalPrice: 1900, stock: 3, img: 'resources/seed.webp', tag: 'Organic Seeds' }
];

// Application Active State Container
let cart = [];

// App Mount Initialization Lifecycle
document.addEventListener('DOMContentLoaded', () => {
    simulateNetworkLoad();
    updateCartUI();
});

// Shimmer Simulation Sequence Engine
async function simulateNetworkLoad() {
    const grid = document.getElementById('productGrid');
    
    // Inject Pure CSS Animated Skeletal Blocks
    grid.innerHTML = Array(6).fill().map(() => `
        <div class="product-card">
            <div class="img-container skeleton skeleton-img"></div>
            <div class="card-details">
                <div class="skeleton skeleton-title"></div>
                <div class="price-row">
                    <div class="skeleton skeleton-price"></div>
                    <div class="skeleton skeleton-btn"></div>
                </div>
            </div>
        </div>
    `).join('');

    // Native timeout simulation (1.2 Seconds to showcase performance loaders)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Render operational components
    renderProducts();
}

// Data Array Mapping and Layout Generator Block
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = PRODUCTS.map(prod => {
        
        // Mathematical Price Calculation Rules Engine
        let priceHTML = `<span class="price-current" style="color:var(--brand-primary);">Rs. ${prod.price.toLocaleString()}</span>`;
        if (prod.originalPrice) {
            const savings = Math.round((1 - (prod.price / prod.originalPrice)) * 100);
            priceHTML = `
                <div class="price-container">
                    <span class="price-old">Rs. ${prod.originalPrice.toLocaleString()}</span>
                    <div>
                        <span class="price-current">Rs. ${prod.price.toLocaleString()}</span>
                        <span class="save-badge">-${savings}%</span>
                    </div>
                </div>
            `;
        }

        // Urgency/Scarcity Notification Logic Block
        let stockHTML = '';
        if (prod.stock < 10) {
            stockHTML = `<div class="stock-warning"><i data-lucide="flame" style="width:14px;height:14px;"></i> High Demand: Only ${prod.stock} left in stock!</div>`;
        }

        return `
            <div class="product-card">
                <span class="badge">${prod.tag}</span>
                <div class="img-container">
                    <img src="${prod.img}" alt="${prod.name}" onerror="this.src='https://placehold.co/400x300?text=Agri+Asset'">
                </div>
                <div class="card-details">
                    <h3 class="title">${prod.name}</h3>
                    <div class="price-row">
                        ${priceHTML}
                        <button class="add-to-cart-btn" onclick="addToCart('${prod.id}')">
                            <span>Add</span>
                            <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i>
                        </button>
                    </div>
                    ${stockHTML}
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons(); // Process Icon Vectors Engine
}

// State Control Methods Pipeline Execution Block
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`Added ${product.name} to cart.`);
}

function alterQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').innerText = totalCount;

    const container = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px 0; color: #64748b;">
                <i data-lucide="shopping-bag" style="width:48px; height:48px; margin-bottom:12px; stroke-width:1.5px;"></i>
                <p>Your shopping cart is completely vacant.</p>
            </div>
        `;
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img" alt="">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="alterQuantity('${item.id}', -1)"><i data-lucide="minus" style="width:14px;"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="alterQuantity('${item.id}', 1)"><i data-lucide="plus" style="width:14px;"></i></button>
                </div>
            </div>
        `).join('');
        document.getElementById('checkoutBtn').disabled = false;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').innerText = `Rs. ${subtotal.toLocaleString()}`;
    
    lucide.createIcons();
}

function toggleCart(openState) {
    document.getElementById('cartDrawer').classList.toggle('active', openState);
}

function openCheckout() {
    toggleCart(false);
    document.getElementById('modalFormBody').style.display = 'block';
    document.getElementById('modalSuccessBody').style.display = 'none';
    
    const summaryList = document.getElementById('modalOrderSummaryItems');
    summaryList.innerHTML = cart.map(item => `
        <div class="preview-item-row">
            <span>${item.name} <small style="color:#64748b;">(x${item.quantity})</small></span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('modalSummaryTotal').innerText = `Rs. ${grandTotal.toLocaleString()}`;

    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="shopping-cart" style="width:18px;"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.animation = 'none';
        toast.offsetHeight; 
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Secure Order Submission Webhook Routing Manifest Pipeline
async function handleOrderSubmit(event) {
    event.preventDefault();
    
    const webhookURL = 'https://discord.com/api/webhooks/1492792645985112165/9mkbnBUVTxe9zzrWzDgphowiOxDt3Bq2CaMjgYQUZLgQOKs6cKtNthlp7R-QFpGZKH7d';
    const submitBtn = document.getElementById('submitOrderBtn');
    
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const province = document.getElementById('province').value;
    const address = document.getElementById('address').value.trim();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Processing Order Realtime...</span>`;

    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const manifestDescription = cart.map(item => `• **${item.name}** × ${item.quantity} — (Rs. ${(item.price * item.quantity).toLocaleString()})`).join('\n');

    const payload = {
        content: "🚨 **NEW SYSTEM ORDER INBOUND — LIVE PIPELINE REPORT**",
        embeds: [{
            title: "Logistical Manifest Invoice",
            description: "An automated web customer routing sheet has been initialized.",
            color: 362436,
            fields: [
                { name: "👨‍🌾 Consignee Customer Details", value: `**Name:** ${name}\n**Phone:** \`${phone}\`\n**Email:** ${email}`, inline: false },
                { name: "📍 Delivery Target Coordinates", value: `**State:** ${province}\n**Address:** ${address}`, inline: false },
                { name: "📦 Itemized Bill of Lading", value: manifestDescription, inline: false },
                { name: "💰 Grand Settlement Value Due", value: `### Rs. ${totalCost.toLocaleString()}`, inline: false }
            ],
            footer: { text: "AgriGear Pro Gateway Logs Engine" },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            cart = [];
            updateCartUI();
            document.getElementById('modalFormBody').style.display = 'none';
            document.getElementById('modalSuccessBody').style.display = 'block';
        } else {
            throw new Error("Target Cloud Endpoints Rejected Manifest Vector Arrays.");
        }
    } catch (err) {
        alert("Transmission pipeline error. Check gateway properties.");
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Confirm & Place Order</span> <i data-lucide="check-circle"></i>`;
        lucide.createIcons();
    }
}
