document.addEventListener("DOMContentLoaded", () => {
    // === 1. Elemen Utama ===
    const toggleFooterBtn = document.getElementById("toggleFooterBtn");
    const footerContainer = document.getElementById("footerContainer");
    const toggleDeleteMode = document.getElementById("toggleDeleteMode");
    const deleteCheckedBtn = document.getElementById("deleteCheckedBtn"); 
    const bookmarkContainer = document.getElementById("bookmarkContainer");
    
    // Elemen Modal Konfirmasi (tetap diperlukan untuk konfirmasi HAPUS)
    const confirmModal = document.getElementById("confirmationModal");
    const confirmTitle = document.getElementById("confirmTitle");
    const confirmMessage = document.getElementById("confirmMessage");
    const confirmActionBtn = document.getElementById("confirmActionBtn");
    const confirmCancelBtn = document.getElementById("confirmCancelBtn");
    

    // === 2. FUNGSI LOGIKA ===

    // Fungsi menghapus produk yang dicentang (dipanggil dari modal)
    window.deleteCheckedProducts = (checkedIds) => {
        let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
        
        const savedAfterDelete = saved.filter(p => !checkedIds.includes(p.id));

        localStorage.setItem("savedProducts", JSON.stringify(savedAfterDelete));
        document.body.classList.remove('delete-mode');
        
        renderSavedProducts();
    };

    // FUNGSI BARU: Menampilkan modal konfirmasi HAPUS (disesuaikan)
    function showConfirmationModal(type, checkedIds) {
        confirmActionBtn.onclick = null;
        confirmCancelBtn.onclick = null;

        if (type === 'confirm') {
            const count = checkedIds.length;
            if (count === 0) {
                alert("Pilih produk yang ingin dihapus terlebih dahulu.");
                return;
            }

            confirmTitle.textContent = `Hapus ${count} Produk?`;
            confirmMessage.textContent = `Anda yakin ingin menghapus ${count} produk yang telah dipilih? Aksi ini tidak dapat dibatalkan.`;
            confirmActionBtn.textContent = "Hapus Sekarang";
            confirmActionBtn.classList.add('action-btn'); 

            // Aksi Konfirmasi: Lakukan penghapusan dan tutup modal
            confirmActionBtn.onclick = () => {
                const productIdsToDelete = checkedIds.map(item => item.id);
                window.deleteCheckedProducts(productIdsToDelete);
                confirmModal.style.display = 'none';
            };
        }

        // Aksi Batal
        confirmCancelBtn.onclick = () => {
            confirmModal.style.display = 'none';
        };
        
        confirmModal.style.display = 'flex';
    }


    // Fungsi menampilkan/merender produk ke halaman
    function renderSavedProducts() {
        let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
        document.getElementById("itemCount").value = "Items: " + saved.length;

        if (saved.length === 0) {
            bookmarkContainer.innerHTML = `
                <div class="empty">
                    <img src="img/saveempty.png" alt="Empty">
                    <p>YOUR BOOKMARK IS EMPTY</p>
                </div>
            `;
        } else {
            bookmarkContainer.innerHTML = saved.map(p => `
                <div class="product-card" data-product-id="${p.id}">
                    <input type="checkbox" class="delete-checkbox" id="checkbox-${p.id}" data-product-id="${p.id}">
                    
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
                </div>
            `).join("");

            // Tambahkan event listener untuk modal produk
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.addEventListener('click', () => {
                    if (!document.body.classList.contains('delete-mode') && window.innerWidth <= 768) {
                        const productId = card.dataset.productId;
                        window.openModal(productId);
                    }
                });
            });
        }
    }

    // Fungsi membuka modal produk
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

    // Fungsi menutup modal produk
    window.closeModal = () => {
        const modal = document.getElementById("productModal");
        modal.style.display = "none";
    };

    // --- 3. EVENT LISTENERS ---

    // Footer Toggle
    toggleFooterBtn.addEventListener("click", () => {
        footerContainer.classList.toggle("is-open");
    });

    // Mode Hapus Toggle (Ikon Edit) - Perubahan di sini!
    if (toggleDeleteMode) {
        toggleDeleteMode.addEventListener('click', (event) => {
            event.stopPropagation();
            // Langsung toggle mode tanpa popup!
            document.body.classList.toggle('delete-mode');
        });
    }

    // Aksi Hapus (Ikon Tempat Sampah)
    if (deleteCheckedBtn) {
        deleteCheckedBtn.addEventListener('click', (event) => {
            const checkedBoxes = document.querySelectorAll('.delete-checkbox:checked');
            // Kita tidak perlu lagi array of objects, cukup array of IDs
            const checkedIds = Array.from(checkedBoxes).map(cb => ({ id: cb.dataset.productId }));

            showConfirmationModal('confirm', checkedIds);
        });
    }

    // Render halaman saat dimuat
    renderSavedProducts();
});