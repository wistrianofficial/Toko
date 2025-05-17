
let produkList = [];
let keranjang = [];

fetch('produk.json')
  .then(res => res.json())
  .then(data => {
    produkList = data;
    tampilkanProduk(produkList);
  });

function tampilkanProduk(produk) {
  const list = document.getElementById("product-list");
  list.innerHTML = '';
  produk.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = \`
      <img src="\${p.gambar}" alt="\${p.nama}">
      <h3>\${p.nama}</h3>
      <p>Rp \${p.harga}</p>
      <button onclick="beli('\${p.id}')">Beli</button>
      <button onclick="location.href='detail.html?id=\${p.id}'">Detail</button>
    \`;
    list.appendChild(div);
  });
}

function filterProduk(kategori) {
  if (kategori === 'Semua') {
    tampilkanProduk(produkList);
  } else {
    const hasil = produkList.filter(p => p.kategori === kategori);
    tampilkanProduk(hasil);
  }
}

function beli(id) {
  const produk = produkList.find(p => p.id === id);
  keranjang.push(produk);
  document.getElementById("cart-count").textContent = keranjang.length;
  document.getElementById("checkout-panel").classList.remove("hidden");
  renderKeranjang();
}

function renderKeranjang() {
  const panel = document.getElementById("cart-items");
  panel.innerHTML = '';
  keranjang.forEach(p => {
    const item = document.createElement("div");
    item.textContent = \`\${p.nama} - Rp \${p.harga}\`;
    panel.appendChild(item);
  });
}

function showForm() {
  document.getElementById("form-panel").classList.remove("hidden");
}

document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = this.nama.value;
  const telepon = this.telepon.value;
  const alamat = this.alamat.value;
  const pesan = keranjang.map(p => \`\${p.nama} - Rp \${p.harga}\`).join('%0A');
  const url = \`https://wa.me/6287888143416?text=Halo%2C%20saya%20mau%20pesan:%0A\${pesan}%0A%0ANama:%20\${nama}%0ANo:%20\${telepon}%0AAlamat:%20\${alamat}\`;
  window.open(url, '_blank');
});
