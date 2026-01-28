const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

const API_URL = "https://script.google.com/macros/s/AKfycbwCOBOUHKDlZaNVohWFnPpVL1BEXD8LgSPF5F9QSp-2LzVFFcyrLQAJ9sSCGGbPy_EBag/exec";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("data-alumni");

    data.forEach(item => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.angkatan}</td>
        <td>${item.jumlah_lulusan}</td>
        <td>${item.alumni_terdata}</td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error("Gagal memuat data alumni:", err);
  });
