const BASE_URL = 'https://62ef17998d7bc7c2eb74f2bc.mockapi.io'

document.addEventListener("DOMContentLoaded", () => {
  const submitRegister = document.getElementById("submitRegister")
  submitRegister.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = String(document.getElementById("registerName").value)
    let email = String(document.getElementById("registerEmail").value)
    let password = String(document.getElementById("registerPassword").value)
    let password2 = String(document.getElementById("registerPassword2").value)

    if (!name || !email || !password || !password2) alert('Something wrong with you input')
    else if (password != password2) alert("Password doesn't match")
    else fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(json => {
        submitRegister.reset()
        alert('Congratz, your account has been created')
        const data = {email: json.email, name: json.name}
        localStorage.setItem("user", JSON.stringify(data))
        window.location.href = "/index.html";
      })
      .catch(err => console.log(err))
  })

})
