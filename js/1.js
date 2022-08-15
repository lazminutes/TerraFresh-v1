const BASE_URL = 'https://62ef17998d7bc7c2eb74f2bc.mockapi.io'
const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`)
  const product = await response.json()
  return await product
}

document.addEventListener("DOMContentLoaded", async () => {
  const boxContainer = document.getElementById("products")
  const nama = document.getElementById("nama")
  const logout = document.getElementById("logout")
  const login = document.getElementById("login")
  const register = document.getElementById("register")
  let products = await fetchProducts()
  let cart = {}
  let user = JSON.parse(localStorage.getItem("user"))

  if (user) {
    nama.classList.add("d-block")
    logout.classList.add("d-block")
    login.classList.add("d-none")
    register.classList.add("d-none")
    nama.innerText = user.name
  } else {
    console.log('wkwk');
    nama.classList.add("d-none")
    logout.classList.add("d-none")
    login.classList.add("d-block")
    register.classList.add("d-block")
  }

  logout.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem("user")
    window.location.href = "/3.html"
  })

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
          stock: product.stock,
          qty: 1,
          url: product.url,
          price: product.price,
          id: product.id
        }
      } else {
        if (cart[`${product.name}`]["stock"] <= 0) alert("Stock not enough!")
        else {
          cart[`${product.name}`] = {
            ...cart[`${product.name}`],
            qty: cart[`${product.name}`]["qty"] + 1,
            stock: cart[`${product.name}`]["stock"]
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart))
    })
  })

})

