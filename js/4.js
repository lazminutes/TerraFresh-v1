document.addEventListener("DOMContentLoaded", () => {
  const listCart = document.getElementById("listCart")
  const payment = document.getElementById("payment")
  let cart = JSON.parse(localStorage.getItem("cart"))
  if (!cart) {
    listCart.innerHTML = `<p>Keranjang anda kosong</p>`
    payment.setAttribute("disabled", true)
  } else {
    for (let product in cart) {
      listCart.insertAdjacentHTML("afterbegin",
        `<tr id="tr-${product}">
            <td>
              <div class="d-flex align-items-center">
                <img
                    src="${cart[product].url}"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                    />
                <div class="ms-3">
                  <p class="fw-bold mb-1">${product}</p>
                </div>
              </div>
            </td>
            <td>
              <span class="badge badge-primary rounded-pill d-inline bg-primary">${cart[product].stock}</span>
            </td>
            <td>
                <p class="text-muted mb-0">Rp. ${cart[product].price}</p>
              </td>
            <td><input type="number" value="${cart[product].qty}" class="form-control" id="${product}-val"></td>
            <td>
              <button type="button" class="btn btn-danger btn-sm btn-rounded" id="${product}">
                Delete
              </button>
            </td>
          </tr>`
      )
      document.getElementById(`${product}`).addEventListener("click", (e) => {
        e.preventDefault()
        delete cart[product]
        localStorage.setItem("cart", JSON.stringify(cart))
        document.getElementById(`tr-${product}`).remove()
      })
    }
  }
  let newCart = {}
  payment.addEventListener("click", (e) => {
    e.preventDefault()
    for (let product in cart) {
      const paymentValue = document.getElementById(`${product}-val`).value
      if ((paymentValue > cart[product].stock) == true) alert('Stock is not enough')
      else {
        cart[product] = {
          ...cart[product],
          qty: paymentValue,
          stock: cart[product].stock - paymentValue
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.href = "/5.html";
      }
    }
  })
})


