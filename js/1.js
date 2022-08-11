const BASE_URL = 'https://62ef17998d7bc7c2eb74f2bc.mockapi.io'
const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`)
  const product = await response.json()
  return await product
}

document.addEventListener("DOMContentLoaded", async () => {
  const boxContainer = document.getElementById("products")
  let products = await fetchProducts()
  let cart = {}
  products.forEach(product => {
    boxContainer.insertAdjacentHTML("afterbegin",
      `<div class="box">
      <img src="${product.url}" alt="">
      <h3>${product.name}</h3>
      <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          </div>
          <span>Rp ${product.price}</span>
      <button class="btn addCart" id="${product.name}">add to cart</button><p style="color: red; font-size:17px">Stock : ${product.stock}</p>
      </div>`
    )

    document.getElementById(product.name).addEventListener("click", (e) => {
      e.preventDefault()
      if (!cart[`${product.name}`]) {
        cart[`${product.name}`] = {
          stock: product.stock - 1,
          qty: 1,
          url: product.url,
          price: product.price
        }
      } else {
        if (cart[`${product.name}`]["stock"] <= 0) alert("Stock not enough!")
        else {
          cart[`${product.name}`] = {
            ...cart[`${product.name}`],
            qty: cart[`${product.name}`]["qty"] + 1,
            stock: cart[`${product.name}`]["stock"] - 1
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart))
    })
  })

})

