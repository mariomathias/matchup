const emailtag = document.querySelector("#email")
const senhatag = document.querySelector("#senha")

async function fazerLogin() {
    const url = 'http://localhost:5000/login';
    const body = {
      email: emailtag.value,
      password: senhatag.value
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error('Ocorreu um erro na requisição.');
      }
  
      const data = await response.text();
      // Salvar o token JWT no localStorage
      localStorage.setItem('token', data);
      console.log('Token JWT salvo no localStorage.');
  
      // Aguardar um curto intervalo de tempo para garantir que o token seja salvo antes de redirecionar
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Redirecionar para a página desejada
      window.location.pathname = "/pages/feed.html";
    } catch (error) {
      alert('Login ou senha incorreto');
    }
  }
  