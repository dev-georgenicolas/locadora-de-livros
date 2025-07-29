class Editora {
    constructor() {
        this.id = 1;
        this.arrayEditoras = [];
        this.editorasPorPagina = 10;
        this.paginaAtual = 1;
    }

    salvar() {
        const editora = this.lerDados();
        this.adicionar(editora);
        this.listaTabela();
    }

    adicionar(editora) {
        this.arrayEditoras.push(editora);
        this.id++;
    }

    lerDados() {
        let editora = {};
        editora.id = this.id;
        editora.nome = document.getElementById('nome').value;
        editora.email = document.getElementById('email').value;
        editora.endereco = document.getElementById('endereco').value;
        editora.site = document.getElementById('site').value;
        return editora;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        const inicio = (this.paginaAtual - 1) * this.editorasPorPagina;
        const fim = inicio + this.livrosPorPagina;
        const editorasPaginadas = this.arrayEditoras.slice(inicio, fim);

        for (let i = 0; i < this.arrayEditoras.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_endereco = tr.insertCell();
            let td_site = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = this.arrayEditoras[i].nome;
            td_email.innerText = this.arrayEditoras[i].email;
            td_endereco.innerText = this.arrayEditoras[i].endereco;
            td_site.innerText = this.arrayEditoras[i].site;
            td_acao.classList.add('center');

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
        }
    }

    popularEditora() {
        const editoras = [
            { nome: "Nova Era", email: "contato@novaera.com", endereco: "Rua das Letras, 101", site: "https://novaera.com" },
            { nome: "Estrela do Saber", email: "saber@estrela.com", endereco: "Av. Central, 202", site: "https://estreladosaber.com" },
            { nome: "Editora Brasilis", email: "info@brasilis.com", endereco: "Rua do Livro, 303", site: "https://brasilis.com" },
            { nome: "LetraViva", email: "contato@letraviva.com", endereco: "Rua A, 12", site: "https://letraviva.com" },
            { nome: "Palavra Mágica", email: "editorial@palavramagica.com", endereco: "Av. Sonhos, 55", site: "https://palavramagica.com" },
            { nome: "Luz & Sombra", email: "luzsombra@edit.com", endereco: "Rua Luz, 66", site: "https://luzesombra.com" },
            { nome: "Editora Horizonte", email: "horizonte@editoras.com", endereco: "Rua do Sol, 77", site: "https://editorahorizonte.com" },
            { nome: "Verso Livre", email: "verso@livre.com", endereco: "Av. Versos, 88", site: "https://versolivre.com" },
            { nome: "Editora Prisma", email: "contato@prisma.com", endereco: "Rua Cores, 99", site: "https://editoraprisma.com" },
            { nome: "Planeta Livro", email: "planeta@livro.com", endereco: "Rua Galáxia, 100", site: "https://planetalivro.com" },
            // { nome: "Caminho Aberto", email: "caminho@aberto.com", endereco: "Rua Liberdade, 11", site: "https://caminhoaberto.com" },
            // { nome: "Raízes Literárias", email: "raizes@lit.com", endereco: "Av. Cultura, 22", site: "https://raizesliterarias.com" },
            // { nome: "Editora Elementar", email: "elementar@editoras.com", endereco: "Rua Sherlock, 33", site: "https://elementarlivros.com" },
            // { nome: "Universo Editorial", email: "universo@editorial.com", endereco: "Av. Cosmos, 44", site: "https://universoeditorial.com" },
            // { nome: "Semente do Saber", email: "semente@saber.com", endereco: "Rua Terra, 55", site: "https://sementedosaber.com" },
            // { nome: "Inspiração Pura", email: "inspiracao@pura.com", endereco: "Av. Ideias, 66", site: "https://inspiracaopura.com" },
            // { nome: "Rota das Palavras", email: "rota@palavras.com", endereco: "Rua Caminho, 77", site: "https://rotadaspalavras.com" },
            // { nome: "Editora Fênix", email: "fenix@edit.com", endereco: "Av. Renascimento, 88", site: "https://editorafenix.com" },
            // { nome: "Alvorada Cultural", email: "alvorada@cultural.com", endereco: "Rua Aurora, 99", site: "https://alvoradacultural.com" },
            // { nome: "Editora Aurora", email: "aurora@editoras.com", endereco: "Av. Leste, 101", site: "https://editoraaurora.com" },
            // { nome: "Sábios & Livros", email: "sabios@livros.com", endereco: "Rua Conhecimento, 111", site: "https://sabioselivros.com" },
            // { nome: "Escrita Moderna", email: "escrita@moderna.com", endereco: "Av. Digital, 121", site: "https://escritamoderna.com" },
            // { nome: "Letras e Sentidos", email: "letras@sentidos.com", endereco: "Rua Poesia, 131", site: "https://letrasesentidos.com" },
            // { nome: "Editora Origem", email: "origem@edit.com", endereco: "Av. Raiz, 141", site: "https://editoraorigem.com" },
            // { nome: "Editora Êxodo", email: "exodo@edit.com", endereco: "Rua Jornada, 151", site: "https://editoraexodo.com" },
            // { nome: "Impressão Divina", email: "divina@impressao.com", endereco: "Av. Milagre, 161", site: "https://impressaodivina.com" },
            // { nome: "Porto das Letras", email: "porto@letras.com", endereco: "Rua Mar, 171", site: "https://portodasletras.com" },
            // { nome: "Luz Editorial", email: "luz@editorial.com", endereco: "Av. Esperança, 181", site: "https://luzeditorial.com" },
            // { nome: "Editora Caminhar", email: "caminhar@editora.com", endereco: "Rua Vida, 191", site: "https://editoracaminhar.com" },
            // { nome: "Chave do Saber", email: "chave@saber.com", endereco: "Av. Conhecimento, 201", site: "https://chavedosaber.com" }
        ];

        editoras.forEach(editora => this.adicionar(editora));
        this.listaTabela();
    }


    criarPaginacao() {
        const totalPaginas = Math.ceil(this.arrayLivros.length / this.livrosPorPagina);
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
}

const editora = new Editora();

window.addEventListener("DOMContentLoaded", () => {
    editora.popularEditora();
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
    editora.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});