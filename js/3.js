const BASE_URL = 'https://62ef17998d7bc7c2eb74f2bc.mockapi.io'
const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`)
  const users = await response.json()
  return await users
}

document.addEventListener("DOMContentLoaded", () => {
  const submitLogin = document.getElementById("submitLogin")
  submitLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    let email = String(document.getElementById("loginEmail").value)
    let password = String(document.getElementById("loginPassword").value)

    if (!email || !password) alert('Something wrong with you input')
    else {
      await fetchUsers()
        .then(res => {
          res.forEach(user => {
            if (user.email == email && user.password == password) {
              window.location.href = "/index.html"
              localStorage.setItem("user", JSON.stringify({ email, name: user.name }))
            }
          });
        })
        .catch(err => console.log(err))
    }
  })
})
