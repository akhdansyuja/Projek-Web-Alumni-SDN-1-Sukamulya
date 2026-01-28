// Navbar scroll animation
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".main-navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active menu highlight
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});