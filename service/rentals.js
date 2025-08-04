class Aluguel {
    constructor() {
        
        this.arrayAlugueis = [];
        this.alugueisPorPagina = 10;
        this.paginaAtual = 1;
    }

    salvar() {
        let user = this.lerDados();
        this.adiconar(user);
        this.listaTabela();
    }

    adiconar(aluguel) {
        this.arrayAlugueis.push(aluguel);
        this.id++;
    }

    lerDados() {
        let user = {}

        user.nome = document.getElementById('nome').value;
        user.livro = document.getElementById('livro').value;
        user.data = document.getElementById('data').value;
        user.status = document.getElementById('status').value;

        return user;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        const inicio = (this.paginaAtual - 1) * this.alugueisPorPagina;
        const fim = inicio + this.alugueisPorPagina;
        const alugueisPaginados = this.arrayAlugueis.slice(inicio, fim);

        for (let i = 0; i < alugueisPaginados.length; i++) {
            let tr = tbody.insertRow();
            const aluguel = alugueisPaginados[i];

            let td_nome = tr.insertCell();
            let td_livro = tr.insertCell();
            let td_data = tr.insertCell();
            let td_status = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = aluguel.nome;
            td_livro.innerText = aluguel.livro;
            td_data.innerText = aluguel.data;
            td_status.innerText = aluguel.status;
            td_acao.classList.add('center');

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
        }
        this.criarPaginacao();
    }

    criarPaginacao() {
        const totalPaginas = Math.ceil(this.arrayAlugueis.length / this.alugueisPorPagina);
        const paginacaoDiv = document.getElementById('paginacao');
        paginacaoDiv.innerHTML = '';


        if (this.paginaAtual > 1) {
            const btnAnterior = document.createElement('button');
            btnAnterior.innerText = '<<';
            btnAnterior.addEventListener('click', () => {
                this.paginaAtual--;
                this.listaTabela();
            });
            paginacaoDiv.appendChild(btnAnterior);
        }


        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = (i === this.paginaAtual) ? 'active' : '';
            btn.addEventListener('click', () => {
                this.paginaAtual = i;
                this.listaTabela();
            });
            paginacaoDiv.appendChild(btn);
        }

        if (this.paginaAtual < totalPaginas) {
            const btnProximo = document.createElement('button');
            btnProximo.innerText = '>>';
            btnProximo.addEventListener('click', () => {
                this.paginaAtual++;
                this.listaTabela();
            });
            paginacaoDiv.appendChild(btnProximo);
        }
    }

    popularAlugueis() {
    const alugueis = [
        { nome: "Ana Clara", livro: "Dom Casmurro", data: "2025-07-01", status: "Ativo" },
        { nome: "Carlos Silva", livro: "1984", data: "2025-07-02", status: "Atrasado" },
        { nome: "Beatriz Souza", livro: "O Pequeno Príncipe", data: "2025-07-03", status: "Entregue" },
        { nome: "João Pedro", livro: "A Revolução dos Bichos", data: "2025-07-04", status: "Ativo" },
        { nome: "Marina Oliveira", livro: "Harry Potter", data: "2025-07-05", status: "Entregue" },
        { nome: "Lucas Mendes", livro: "Percy Jackson", data: "2025-07-06", status: "Atrasado" },
        { nome: "Isabela Lima", livro: "O Hobbit", data: "2025-07-07", status: "Ativo" },
        { nome: "Rafael Costa", livro: "Capitães da Areia", data: "2025-07-08", status: "Entregue" },
        { nome: "Gabriela Rocha", livro: "A Cabana", data: "2025-07-09", status: "Atrasado" },
        { nome: "Bruno Almeida", livro: "O Alquimista", data: "2025-07-10", status: "Ativo" }
    ];

    alugueis.forEach((aluguel) => {
        this.adiconar(aluguel);
    });

    this.listaTabela();
}



}

var aluguel = new Aluguel();

window.addEventListener("DOMContentLoaded", () => {
    aluguel.popularAlugueis();
});


document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("userModal").style.display = "flex";
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("userModal").style.display = "none";
    document.getElementById("userForm").reset(); 
});

window.addEventListener("click", function (event) {
    const modal = document.getElementById("userModal");
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("userForm").reset();
    }
});

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    aluguel.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});


const searchbar = document.getElementById('searchbar');
const tabela = document.getElementById('tbody')

function search() {
    termo = searchbar.value.toLowerCase()
    termo.toLowerCase();
    let linhas = tabela.getElementsByTagName('tr');

    for(let i in linhas){
        if(true === isNaN(i)){
            continue
        }
        
        let conteudo = linhas[i].innerHTML.toLocaleLowerCase();

        if(true === conteudo.includes(termo) ){
            linhas[i].style.display = ''

        }
        else{
            linhas[i].style.display = 'none'
        }
        
    }
    
}