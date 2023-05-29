//<img src="../imgs/overwatch.jpg" class="rounded" alt="Overwatch Banner" width="100px" height="120px">

const discordtag = document.querySelector("#discord")
const twittertag = document.querySelector("#twitter")
const instagramtag = document.querySelector("#instagram")
const imgperfiltag = document.querySelector("#imgperfil")
const nametag = document.querySelectorAll("#name")
const sobretag = document.querySelectorAll("#sobrenome")
const emailtag = document.querySelectorAll("#email")
const celulartag = document.querySelectorAll("#celular")
const enderecotag = document.querySelectorAll("#endereco")

async function updateUsuario() {
    const url = 'http://localhost:5000/usuario'
    const token = localStorage.getItem('token')
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            name: nametag[0].textContent,
            about: sobretag[0].textContent,
            username: emailtag[0].textContent,
            email: emailtag[1].textContent,
            celular: celulartag[0].textContent,
            endereco: enderecotag[0].textContent,
            discord: discordtag.textContent,
            twitter: twittertag.textContent,
            instagram: instagramtag.textContent // 🏳️‍🌈 lgbt flag
        })
    })
    await obterUsuario()
}

async function obterUsuario() {
    const url = 'http://localhost:5000/usuario';
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
        nametag.forEach(nome => nome.innerHTML = data[1])
        emailtag.forEach(email => email.innerHTML = data[2])
        sobretag.forEach(sobrenome => sobrenome.innerHTML = data[4])
        celulartag.forEach(celular => celular.innerHTML = data[5])
        enderecotag.forEach(endereco => endereco.innerHTML = data[6])
        imgperfiltag.src = 'http://localhost:5000/user/image/'+data[7]
        discordtag.innerHTML = data[8]
        twittertag.innerHTML = data[9]
        instagramtag.innerHTML = data[10]
        instagramtag.href = 'https://www.instagram.com/'+(data[10].replaceAll("@", ""))
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
  }

obterUsuario() 

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

function uploadImage() {
    const fileInput = document.getElementById('uploadimg');
    const file = fileInput.files[0];
    const token = localStorage.getItem('token');
  
    if (file) {
      const reader = new FileReader();
  
      reader.addEventListener('load', function () {
        const base64Image = reader.result.split(',')[1]; // Extract the base64 data from the result
        const requestBody = { img64: base64Image };
  
        fetch('http://localhost:5000/image', {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify(requestBody),
        })
          .then(response => {
            if (response.ok) {
              console.log('Image uploaded successfully.');
            } else {
              console.log('Image upload failed.');
            }
          })
          .catch(error => {
            console.log('Error occurred during image upload:', error);
          });
      });
  
      reader.readAsDataURL(file);
    }
}