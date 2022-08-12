document.addEventListener("DOMContentLoaded", () => {
  const nota = document.getElementById("nota")
  const carouselPayment = document.getElementById("carousel-payment")
  const namePayment = document.getElementById("name-payment")
  const hargaSatuan = document.getElementById("harga-satuan")
  const hargaTotal = document.getElementById("harga-total")
  const divTotal = document.getElementById("div-total")
  let cart = JSON.parse(localStorage.getItem("cart"))
  let jumlahHarga = 0

  divTotal.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/6.html";
    localStorage.removeItem("cart")
  })


  for (let product in cart) {
    nota.insertAdjacentHTML("afterbegin",
      `
    <div class="d-flex justify-content-between">
    <p class="fw">${product}</p>
    <p class="fw-lighter">Rp ${cart[product].price} x${cart[product].qty}</p>
    </div>
    `
    )
    carouselPayment.insertAdjacentHTML("afterbegin",
      `
    <div class="col-md-4 col-sm-2">
        <img src="${cart[product].url}"
            class="d-block w-100 h-100">
    </div>
    `
    )
    jumlahHarga += cart[product].price * cart[product].qty
    hargaSatuan.innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(jumlahHarga);
    hargaTotal.innerText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(jumlahHarga + 15000);
    divTotal.innerText = `BAYAR ${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(jumlahHarga + 15000)}`
  }

})
