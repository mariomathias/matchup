const image = document.querySelector('#image');
const nome = document.querySelector('#nome');

function updateUser(user) {
  image.src = '../imgs/'+user[7]+'.png';
  nome.innerHTML = user[1]
}

function obterUsuario() {
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
      updateUser(data);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
  }

obterUsuario()