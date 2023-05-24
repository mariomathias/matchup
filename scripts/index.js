async function createUser() {
    const name = document.querySelector("#name").value
    const username = document.querySelector("#username").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (name.trim() === "" || username.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("Preencha todos os campos necessários!")
        return
    }
    let m = ""
    await fetch("http://localhost:5000/usuario", {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, username: username, email: email, password: password}) })
        .then(data => data.text())
        .then(msg => m = msg) 
        if(m !== ""){
            alert(m)
            return
        }
        window.location.href = "../pages/escolher-jogo.html"
}