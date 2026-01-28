const apiURL =
  "https://script.google.com/macros/s/AKfycbyRIuLHYxOgKQ57H_Wef8CDNEhef0AnYeW6Xxz4m7VPzmFW96jZlWlAxCYKkMwSG2Xq/exec";

let alumni = [];

let halaman = 1;
let perPage = 10;
let dataFilter = [];

let sortMode = "AZ";

$(document).ready(function () {
  loadData();

  $("#sortAZ").click(function () {
    sortMode = "AZ";
    filterData();
  });

  $("#sortZA").click(function () {
    sortMode = "ZA";
    filterData();
  });

  $("#search").on("keyup", filterData);
  $("#filterAngkatan").on("change", filterData);
});

function loadData() {
  $("#dataAlumni").html(`
    <tr class="skeleton-row">
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
    </tr>
    <tr class="skeleton-row">
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
    </tr>
    <tr class="skeleton-row">
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
      <td><div class="skeleton-bar"></div></td>
    </tr>
  `);

  $.getJSON(apiURL, function (data) {
    alumni = sortByNama(data);
    tampilkanData(alumni);
    isiFilterAngkatan(alumni);
  });
}

function tampilkanData(data) {
  dataFilter = data;
  let total = data.length;
  let start = (halaman - 1) * perPage;
  let end = start + perPage;
  let dataTampil = data.slice(start, end);

  let html = "";
  dataTampil.forEach((a, index) => {
    let nomor = start + index + 1;

    html += `
    <tr>
      <td>${nomor}</td>
      <td>${a["Nama Lengkap"]}</td>
      <td>${a["NIS"]}</td>
      <td>${a["Tempat, Tanggal Lahir"]}</td>
      <td>${a["Jenis Kelamin"]}</td>
      <td>${a["Angkatan"]}</td>
    </tr>`;
  });

  $("#dataAlumni").html(html);

  $("#infoPage").text(
    `Menampilkan ${start + 1} - ${Math.min(end, total)} dari ${total} data`
  );

  buatPagination(total);
}

function isiFilterAngkatan(data) {
  let angkatan = [...new Set(data.map((a) => a["Angkatan"]))];
  angkatan.forEach((a) => {
    $("#filterAngkatan").append(`<option value="${a}">${a}</option>`);
  });
}

function filterData() {
  halaman = 1;

  let search = $("#search").val().toLowerCase();
  let angkatan = $("#filterAngkatan").val();

  let hasil = alumni.filter((a) => {
    let cocokSearch =
      a["Nama Lengkap"].toLowerCase().includes(search) ||
      a["NIS"].toString().includes(search);

    let cocokAngkatan = angkatan === "" || a["Angkatan"] == angkatan;

    return cocokSearch && cocokAngkatan;
  });

  tampilkanData(sortByNama(hasil));
}

function buatPagination(total) {
  let totalHalaman = Math.ceil(total / perPage);
  let html = "";

  for (let i = 1; i <= totalHalaman; i++) {
    html += `
        <li class="page-item ${i == halaman ? "active" : ""}">
            <a class="page-link" href="#" onclick="pindahHalaman(${i})">${i}</a>
        </li>`;
  }

  $("#pagination").html(html);
}

function pindahHalaman(h) {
  halaman = h;
  tampilkanData(dataFilter);
}

function sortByNama(data) {
  return data.sort((a, b) => {
    if (sortMode === "AZ") {
      return a["Nama Lengkap"].localeCompare(b["Nama Lengkap"]);
    } else {
      return b["Nama Lengkap"].localeCompare(a["Nama Lengkap"]);
    }
  });
}
