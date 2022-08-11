const BASE_URL = 'https://62ef17998d7bc7c2eb74f2bc.mockapi.io'
const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`)
  const users = await response.json()
  return await users
}

document.addEventListener("DOMContentLoaded", () => {
  const submitLogin = document.getElementById("submitLogin")
  submitLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = String(document.getElementById("loginEmail").value)
    let password = String(document.getElementById("loginPassword").value)

    if (!email || !password) alert('Something wrong with you input')
    else {
      fetchUsers()
      .then(res => {
        res.forEach(user => {
          if (user.email == email && user.password == password) {
            submitLogin.reset()
            window.location.href = "/index.html";
          } else alert('Wrong password/email')
        });
      })
      .catch(err => console.log(err))
    }
  })
})
