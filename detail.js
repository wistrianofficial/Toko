
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('produk.json')
  .then(res => res.json())
  .then(produkList => {
    const produk = produkList.find(p => p.id === id);
    if (!produk) return;
    document.getElementById("product-detail").innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}" style="width:200px;">
      <h2>${produk.nama}</h2>
      <p>Harga: Rp ${produk.harga}</p>
      <p>${produk.deskripsi || 'Deskripsi belum tersedia.'}</p>
      <button onclick="beli('${produk.id}')">Beli</button>
    `;
    const rekomendasi = produkList.filter(p => p.id !== id).slice(0, 6);
    const rekomDiv = document.getElementById("rekomendasi-list");
    rekomendasi.forEach(p => {
      const el = document.createElement("div");
      el.className = "product";
      el.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}">
        <h3>${p.nama}</h3>
        <p>Rp ${p.harga}</p>
        <button onclick="location.href='detail.html?id=${p.id}'">Lihat Detail</button>
      `;
      rekomDiv.appendChild(el);
    });
  });

function beli(id) {
  const cart = JSON.parse(localStorage.getItem("keranjang") || "[]");
  fetch('produk.json')
    .then(res => res.json())
    .then(list => {
      const produk = list.find(p => p.id === id);
      cart.push(produk);
      localStorage.setItem("keranjang", JSON.stringify(cart));
      alert("Produk ditambahkan ke keranjang!");
    });
}
