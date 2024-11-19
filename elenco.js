const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const url = "https://botafogo-atletas.mange.li/2024-1/"



const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const container = document.getElementById("container");

const limpaTela = () => container.innerHTML = "";

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`; // link para pag saiba mais

    window.location = url;
}

const manipulaClickSair = (e) => {
    localStorage.removeItem('logado');
    window.location = 'index.html'
}



const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    cartao.classList.add('cards');
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = 'sans-serif';
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);



    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.njogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
}

const manipulaClickFeminino = (e) => {
    limpaTela();
    pega_json(`${url}feminino`).then( 
    (r) => {
        r.forEach((ele) => container.appendChild(montaCard(ele)))
    } 
    
    )

};

const manipulaClickMasculino = (e) => {
    limpaTela();
    pega_json(`${url}masculino`).then( 
    (r) => {
        r.forEach(
            (ele) => container.appendChild(montaCard(ele))
        )
    } 
    
    )
};
const manipulaClickAll = (e) => {
    limpaTela();
    pega_json(`${url}all`).then( 
    (r) => {
        r.forEach(
            (ele) => container.appendChild(montaCard(ele))
        )
    } 
    
    )
};


if (localStorage.getItem('logado')){

pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    (r) => montaCard(r)
);
}


else {
    document.body.innerHTML = "<h1>Você precisa estar logado.</h1>"
}



//Clicks dos botoes

document.getElementById('masculino').onclick = manipulaClickMasculino;
document.getElementById('feminino').onclick = manipulaClickFeminino;
document.getElementById('all').onclick = manipulaClickAll;
document.getElementById('botao-sair').onclick = manipulaClickSair;

//clicks do dropdown

function clickDropDown() {
    const dropDown = document.getElementById('dropdown');
    const valorSelecionado = dropDown.value;

    if (valorSelecionado === "masculino") {manipulaClickMasculino()}
    else if (valorSelecionado === "feminino") {manipulaClickFeminino()}
    else if (valorSelecionado === "all") {manipulaClickAll()}
}

//Filtro
const filterElement = document.getElementById("filter")

filterElement.addEventListener("input",filterCards)
function filterCards() {
    const cards = document.querySelectorAll(".cards")

  if(filterElement.value != "") {
    cards.forEach((card)=>{
      let title = card.querySelector('h1');
      title = title.innerText.toLowerCase();
      let filterText = filterElement.value.toLowerCase();
      if (!title.includes(filterText)) {
        card.style.display = "none"
      }
      
      else {
        card.style.display = "block"
      }
    })

  }
  else {
    cards.forEach((card) => {
        card.style.display = "block"
    })
  }
}






