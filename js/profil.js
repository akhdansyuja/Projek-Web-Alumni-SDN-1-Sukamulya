
  const sheetURL =
    "https://script.google.com/macros/s/AKfycbyQhoWOjPbLCtz4V5u5MsEi1xKO0CJ3zjozVCIWuzTmJrCKk_VzbqJrndioJP5uUAAG/exec";

  fetch(sheetURL)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#tabelGuru tbody");
      tableBody.innerHTML = "";

      data.forEach((guru, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td class="text-center">${index + 1}</td>
          <td>${guru.nama}</td>
          <td>${guru.nip}</td>
          <td>${guru.jabatan}</td>
        `;

        tableBody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Gagal mengambil data guru:", error);
    });