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



// Fungsi untuk menampilkan popup signup
function signupPopup() {
  const popup = document.getElementById("signupPopup");
  const overlay = document.getElementById("darkers");

  popup.classList.remove("hide");
  popup.classList.add("show");

  overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Mencegah scrolling
}

// Fungsi untuk menutup popup signup
function toggleSignupPopup() {
  const popup = document.getElementById("signupPopup");
  const overlay = document.getElementById("darkers");

  popup.classList.remove("show");
  popup.classList.add("hide");

  overlay.classList.remove("active");
  document.body.style.overflow = "auto"; // Mengembalikan scrolling
}




// Function to toggle Sign Up popup
function toggleSignUp() {
  const signupPopup = document.getElementById("signupPopup");
  const signinPopup = document.getElementById("signinPopup");
  const darkers = document.getElementById("darkers");

  // Hide Sign In and show Sign Up
  signinPopup.classList.remove("show");
  signinPopup.classList.add("hide");
  signupPopup.classList.remove("hide");
  signupPopup.classList.add("show");

  // Activate dark overlay
  darkers.classList.add("active");

  // Disable scroll on body when popup is active
  document.body.style.overflow = "hidden";
}

// Function to toggle Sign In popup
function toggleSignIn() {
  const signupPopup = document.getElementById("signupPopup");
  const signinPopup = document.getElementById("signinPopup");
  const darkers = document.getElementById("darkers");

  // Hide Sign Up and show Sign In
  signupPopup.classList.remove("show");
  signupPopup.classList.add("hide");
  signinPopup.classList.remove("hide");
  signinPopup.classList.add("show");

  // Activate dark overlay
  darkers.classList.add("active");

  // Disable scroll on body when popup is active
  document.body.style.overflow = "hidden";
}

// Function to close both popups
function toggleSignupPopup() {
  const signupPopup = document.getElementById("signupPopup");
  const signinPopup = document.getElementById("signinPopup");
  const darkers = document.getElementById("darkers");

  // Hide both popups
  signupPopup.classList.remove("show");
  signupPopup.classList.add("hide");
  signinPopup.classList.remove("show");
  signinPopup.classList.add("hide");

  // Deactivate dark overlay
  darkers.classList.remove("active");

  // Disable scroll on body when popup is active
  document.body.style.overflow = "auto";
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