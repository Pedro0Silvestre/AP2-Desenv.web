
const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_sha256(texto) === "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1") {
        localStorage.setItem('logado','sim'); //logar encriptado baixar o script do paj
    }
    else {
        alert("Você errou a senha!!! bobao");
        localStorage.removeItem('logado');
    }

    if (localStorage.getItem('logado')) {window.location = 'elenco.html'}
};


document.getElementById('botao').onclick = manipulaBotao;





