const sobre = document.querySelector('#sobre');
const localizacao = document.querySelector('#localizacao');
const email = document.querySelector('#email');

function updateUser(user) {
  sobre.innerHTML = user[4];
  localizacao.innerHTML = user[6];
  email.innerHTML = user[2];
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