let currentSlide = 0;
let timeout; // Untuk menyimpan waktu tunggu tombol
let autoplayInterval; // Menyimpan interval autoplay
let direction = 1; // 1 untuk maju, -1 untuk mundur

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slide').length;

  // Mengatur slide yang aktif
  if (index >= totalSlides) {
    direction = -1; // Ubah arah ke mundur jika mencapai slide terakhir
    currentSlide = totalSlides - 2; // Kembali ke slide sebelumnya
  } else if (index < 0) {
    direction = 1; // Ubah arah ke maju jika mencapai slide pertama
    currentSlide = 1; // Pindah ke slide kedua
  } else {
    currentSlide = index;
  }

  // Terapkan perubahan posisi slider
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Sembunyikan tombol selama transisi
  hideArrows();
}

function nextSlide() {
  showSlide(currentSlide + direction);
}

function prevSlide() {
  direction = -1; // Ubah arah ke mundur
  showSlide(currentSlide - 1);
}

function hideArrows() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach(arrow => arrow.classList.add('hidden'));

  // Tampilkan kembali tombol setelah 1 detik
  clearTimeout(timeout);
  timeout = setTimeout(showArrows, 1000);
}

function showArrows() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach(arrow => arrow.classList.remove('hidden'));
}

// Fungsi autoplay
function startAutoPlay() {
  clearInterval(autoplayInterval); // Hentikan autoplay sebelumnya jika ada

  autoplayInterval = setInterval(() => {
    nextSlide(); // Pindahkan ke slide berikutnya
  }, 5000); // Slide otomatis setiap 5 detik
}

// Event Listener untuk tombol arrow
document.querySelector('.arrow.left').addEventListener('click', () => {
  prevSlide();
  startAutoPlay(); // Reset autoplay saat arrow diklik
  direction = -1;  // Set arah ke mundur saat tombol kiri ditekan
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  direction = 1;  // Set arah ke maju saat tombol kanan ditekan
  nextSlide();
  startAutoPlay(); // Reset autoplay saat arrow diklik
});

// Mulai autoplay
startAutoPlay();





// Select all customers and navigation arrows
const customers = document.querySelectorAll('.customer');
const arrowRight = document.querySelectorAll('.arrow-right');
const arrowLeft = document.querySelectorAll('.arrow-left');

// Initialize the current index
let currentIndex = 0;

// Function to update slides with animation
function updateSlides(newIndex, direction) {
  // Remove current active slide
  const currentSlide = customers[currentIndex];
  currentSlide.classList.remove('active');
  currentSlide.classList.add(direction === 'right' ? 'exit-left' : 'exit-right');

  // Update to new index
  currentIndex = newIndex;

  // Add active class to the new slide
  const nextSlide = customers[currentIndex];
  nextSlide.style.display = 'block'; // Ensure it's visible for animation
  nextSlide.classList.add('active');

  // Clean up after animation
  setTimeout(() => {
    currentSlide.style.display = 'none';
    currentSlide.classList.remove('exit-left', 'exit-right');
  }, 500); // Match the transition duration in CSS
}

// Event listeners for right arrows
arrowRight.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % customers.length;
    updateSlides(newIndex, 'right');
  });
});

// Event listeners for left arrows
arrowLeft.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + customers.length) % customers.length;
    updateSlides(newIndex, 'left');
  });
});

// Initialize the first slide as visible
customers[currentIndex].style.display = 'block';
customers[currentIndex].classList.add('active');



// Toggle the visibility of the popup and overlay with animation and dark effect
function togglePopup() {
  const popup = document.getElementById('searchPopup');
  const overlay = document.getElementById('darker');
  const body = document.body;

  // Cek apakah overlay sudah ada, jika tidak, buat dan tambahkan ke body
  if (!document.querySelector(".darker")) {
    const newOverlay = document.createElement('div');
    newOverlay.id = 'darker';
    newOverlay.classList.add('darker');
    document.body.appendChild(newOverlay);
  }

  // Toggle untuk popup dan overlay dengan animasi
  popup.classList.toggle("active");
  overlay.classList.toggle("active");

  // Efek saat overlay di-klik untuk menutup popup
  overlay.onclick = function () {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  };

}



function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  var hamburger = document.querySelector(".hamburger");
  var body = document.body; // Ambil elemen body

  // Toggle kelas "active" untuk menu dan hamburger
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Jika menu aktif, nonaktifkan scroll
  if (menu.classList.contains("active")) {
    body.style.overflow = "hidden"; // Nonaktifkan scroll
  } else {
    body.style.overflow = "auto"; // Aktifkan kembali scroll
  }
}



  



















