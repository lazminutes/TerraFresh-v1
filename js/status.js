document.addEventListener("DOMContentLoaded", () => {
  const success = document.getElementById("success")
  success.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/index.html";
  })
  
})
