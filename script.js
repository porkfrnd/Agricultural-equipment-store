function buyItem(item) {
    const modal = document.getElementById("productModal");
    const frame = document.getElementById("modalFrame");
    frame.src = "mini.html?product=" + encodeURIComponent(item);
    modal.style.display = "block";
}
function closeModal() {
    document.getElementById("productModal").style.display = "none";
    document.getElementById("modalFrame").src = "";
}
window.onclick = function(event) {
    const modal = document.getElementById("productModal");
    if (event.target == modal) {
        closeModal();
    }
}