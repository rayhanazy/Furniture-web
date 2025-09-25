document.addEventListener("DOMContentLoaded", () => {
    // Fungsi untuk mengontrol footer
    const toggleFooterBtn = document.getElementById("toggleFooterBtn");
    const footerContainer = document.getElementById("footerContainer");

    toggleFooterBtn.addEventListener("click", () => {
        footerContainer.classList.toggle("is-open");
    });

    // Fungsi untuk menampilkan produk
    function renderSavedProducts() {
        let container = document.getElementById("bookmarkContainer");
        let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
        
        document.getElementById("itemCount").value = "Items: " + saved.length;

        if (saved.length === 0) {
            container.innerHTML = `
                <div class="empty">
                    <img src="img/saveempty.png" alt="Empty">
                    <p>YOUR BOOKMARK IS EMPTY</p>
                </div>
            `;
        } else {
            container.innerHTML = saved.map(p => `
                <div class="product-card" data-product-id="${p.id}">
                    <div class="product-logo-container">
                        <img src="img/logo2.jpg" alt="Bengkel Kayoe Logo">
                    </div>
                    <div class="product-details-container">
                        <h4>${p.name}</h4>
                        <p class="product-description-text">${p.desc}</p>
                        <div class="product-dimensions">
                            <small>DIMENSIONS</small> <br>
                            <small>${p.dim}</small>
                        </div>
                        <div class="click-for-details">Click for details</div>
                    </div>
                    <button class="edit-btn" onclick="deleteProduct('${p.id}')">
                        <img src="img/cancel.png" alt="Delete">
                    </button>
                </div>
            `).join("");

            // Tambahkan event listener untuk setiap product card
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.addEventListener('click', () => {
                    // Hanya buka modal jika lebar layar 768px atau kurang
                    if (window.innerWidth <= 768) {
                        const productId = card.dataset.productId;
                        openModal(productId);
                    }
                });
            });
        }
    }

    // Fungsi untuk membuka modal (popup)
    window.openModal = (productId) => {
        const saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
        const product = saved.find(p => p.id === productId);

        if (product) {
            const modal = document.getElementById("productModal");
            document.getElementById("modalTitle").textContent = product.name;
            document.getElementById("modalDescription").textContent = product.desc;
            document.getElementById("modalDimensions").textContent = product.dim;
            document.getElementById("modalLogo").src = "img/logo2.jpg";

            modal.style.display = "flex";
        }
    };

    // Fungsi untuk menutup modal
    window.closeModal = () => {
        const modal = document.getElementById("productModal");
        modal.style.display = "none";
    };
    
    window.deleteProduct = (id) => {
        let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
        saved = saved.filter(p => p.id !== id);
        localStorage.setItem("savedProducts", JSON.stringify(saved));
        renderSavedProducts();
    };

    renderSavedProducts();
});