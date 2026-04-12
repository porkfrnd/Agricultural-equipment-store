window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
        document.getElementById('displayName').innerText = "Ordering: " + product;
    }
});

async function sendToDiscord() {
    const webhookURL = 'https://discord.com/api/webhooks/1492792645985112165/9mkbnBUVTxe9zzrWzDgphowiOxDt3Bq2CaMjgYQUZLgQOKs6cKtNthlp7R-QFpGZKH7d';
    
    const submitBtn = document.getElementById('submitBtn');
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');

    const item = new URLSearchParams(window.location.search).get('product');
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const province = document.getElementById('province').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !email) {
        alert("Please fill in Name, Email, and Phone.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    const contents = {
        content: "🚜 **New Order Received**",
        embeds: [{
            title: "Customer Details",
            color: 3066993, 
            fields: [
                { name: "Product", value: item || "Unknown", inline: true },
                { name: "Customer", value: name, inline: true },
                { name: "Phone", value: phone, inline: true },
                { name: "Email", value: email, inline: false },
                { name: "Location", value: `${province}, ${address}`, inline: false }
            ]
        }]
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contents)
        });

        if (response.ok) {
            if (orderForm) orderForm.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';
            
            setTimeout(() => {
                window.parent.closeModal();
            }, 3000);
            
        } else {
            throw new Error("Discord API error");
        }
    } catch (error) {
        alert("Failed to place order.");
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Place Order";
    }
}