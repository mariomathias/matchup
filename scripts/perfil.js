//<img src="../imgs/overwatch.jpg" class="rounded" alt="Overwatch Banner" width="100px" height="120px">

async function loadGames() {
    let data = null
    await fetch('http://localhost:5000/images/1')
    .then(response => response.json())
    .then(d => { data = d; console.log(d)})
    console.log(data)
    const imgs = document.querySelector("#images")
    const img = document.createElement("img")
    img.src = data.img
    img.style.width = "100px"
    img.style.height = "120px"
    img.classList.add("rounded")
    img.alt = data.name
    imgs.insertBefore(img,imgs.firstChild)
}

loadGames()