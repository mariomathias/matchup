async function createUser() {
    const name = document.querySelector("#name").value
    const username = document.querySelector("#username").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    
    await fetch("http://localhost:5000/usuario", {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, username: username, email: email, password: password}) })
        window.location.href = "../pages/choose-game.html"
}