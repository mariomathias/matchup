async function editUser() {
    const token = localStorage.getItem('token');
    const name = document.querySelector("#nome").value
    const about = document.querySelector("#sobre").value
    const email = document.querySelector("#email").value
    const celular = document.querySelector("#celular").value
    const endereco = document.querySelector("#endereco").value
    const discord = document.querySelector('#discord').value
    const twitter = document.querySelector('#twitter').value
    const instagram = document.querySelector('#instagram').value
    let body = {}
    if (name) body.name = name;
    if (about) body.sobre = about;
    if (email) body.email = email;
    if (celular) body.celular = celular;
    if (endereco) body.endereco = endereco;
    if (discord) body.discord = discord;
    if (twitter) body.twitter = twitter;
    if (instagram) body.instagram = instagram;
    const resp = await fetch("http://localhost:5000/usuario", {
        method: 'PUT',
        headers: { 
            'Authorization': `${token}`,
            'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    resp.status > 200 && resp.status < 300 ? window.location.href = "../pages/perfil.html" : alert("Erro ao editar usuário")
}