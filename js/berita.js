document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".row.g-4");

  fetch("https://script.google.com/macros/s/AKfycbzcgvYhlBPXiE1nwInsRskVby95FtnRZ1Q2fYyrTVWiwIggovaEDn8jZZd_43yVz8PjKg/exec")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(item => {
        container.innerHTML += `
          <div class="col-md-4 col-lg-3">
            <div class="card berita-card h-100">
              <img src="${item["Link foto"]}" class="card-img-top" alt="Berita">
              <div class="card-body">
                <span class="badge bg-primary mb-2">
                  ${item["Tag"]}
                </span>
                <h5 class="card-title">
                  ${item["Judul"]}
                </h5>
                <p class="card-text">
                  ${item["Keterangan"]}
                </p>
              </div>
            </div>
          </div>
          
        `;
      });
    })
    .catch(err => {
      console.error("Gagal load data:", err);
    });
});
