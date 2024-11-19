
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const pega_json = async(caminho) => {
    try{
    const resposta = await fetch(caminho);
    if (!resposta.ok){
        throw new Error(`Erro ao obter os dados. Status: ${resposta.status}`)
    }
    const dados = await resposta.json();
    return dados;
}
    catch(error) {
        alert("Ocorreu um erro ao carregar os dados: " + error.message)
    }
}

const montaPagina = (dados) => {
    const body = document.body;
    body.innerHTML = "";

    const mainCard = document.createElement("div");
    mainCard.id = 'main-card'
    body.appendChild(mainCard)

    const status = document.createElement("div");
    status.id = 'status'

    const descricao = document.createElement("div");
    descricao.id = 'descricao'
    

    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome;
    mainCard.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.src = dados.imagem;
    mainCard.appendChild(imagem);

    const statusHead = document.createElement("h2");
    statusHead.innerText = 'STATUS'
    status.appendChild(statusHead);

    const num_jogos = document.createElement("h3");
    num_jogos.innerText = `No botafogo: ${dados.n_jogos}`; 
    status.appendChild(num_jogos);

    const nascimento = document.createElement("h3");
    nascimento.innerText = `Nascimento:${dados.nascimento}`;
    status.appendChild(nascimento);

    const naturalidade = document.createElement("h3");
    naturalidade.innerText = `Naturalidade:${dados.naturalidade}`;
    status.appendChild(naturalidade);

    const altura = document.createElement("h3");
    altura.innerText = `Altura:${dados.altura}`;
    status.appendChild(altura);

    const no_botafogo_desde =document.createElement("h3");
    no_botafogo_desde.innerHTML = `No botafogo desde:${dados.no_botafogo_desde}`
    status.appendChild(no_botafogo_desde);

    mainCard.appendChild(status)

    const descricaoHead = document.createElement("h2");
    descricaoHead.innerText = 'DESCRIÇÃO';
    descricao.appendChild(descricaoHead);


    const descri = document.createElement("p");
    descri.innerText = dados.detalhes;
    descricao.appendChild(descri);

    mainCard.appendChild(descricao);

    const voltar = document.createElement("a");
    voltar.innerText = 'Voltar';
    voltar.href = 'elenco.html'
    mainCard.appendChild(voltar)
}


if (localStorage.getItem('logado')){





pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    (r) => montaPagina(r)
);
}


else {
    document.body.innerHTML = "<h1>Você precisa estar logado.</h1>"
}

