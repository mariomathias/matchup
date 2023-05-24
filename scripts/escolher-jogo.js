let games = []
let comp = true
let casual = true
let selected = []

function compH(cb) {
    comp = cb.checked
    filterGames()
}

function casualH(cb) {
    casual = cb.checked
    filterGames()
}

function filterGames() {
    const s = document.querySelector("#games")
    s.innerHTML = "<option selected>Escolha até 3 jogos</option>"
    games.forEach((g,i) => {
        if (comp && g[3] === "competitivo" || casual && g[3] === "casual") {
            const el = document.createElement("option")
            el.value = g[0]
            el.innerText = g[1]
            s.appendChild(el)
        }
    })
}

function selectH(c) {
    if (selected.length >= 3) {
        alert("Limite de jogo excedido!")
        return
    }
    const imgs = document.querySelector("#images")
    const img = document.createElement("img")
    img.src = games[c.value-1][2]
    img.style.width = "100px"
    img.style.height = "120px"
    img.style.marginRight = "10px"
    imgs.appendChild(img)
    selected.push(games[c.value-1])
}

function doneH() {
    if (selected.length === 0) {
        alert("Escolha pelo menos 1 jogo!")
        return
    }
    window.location.href = "../pages/feed.html"
}

async function loadGames() {
    let data = null
    await fetch('http://localhost:5000/game')
    .then(response => response.json())
    .then(d => {d.forEach(g => games.push(g))})
    
    filterGames()
}

loadGames()