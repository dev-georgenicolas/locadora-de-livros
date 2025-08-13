const token = localStorage.getItem('token')

const apiClient = axios.create({
    baseURL: "https://locadora-ryan-back.altislabtech.com.br",
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

class Livro {
    constructor() {
        this.id = 1;
        this.arrayLivros = [];
        this.livrosPorPagina = 10;
        this.paginaAtual = 1;
    }

    salvar() {
        const livro = this.lerDados();
        this.adicionar(livro);
        this.listaTabela();
    }

    adicionar(livro) {
        this.arrayLivros.push(livro);
        this.id++;
    }

    lerDados() {
        let livro = {};
        livro.id = this.id;
        livro.titulo = document.getElementById('titulo').value;
        livro.autor = document.getElementById('autor').value;
        livro.copias = document.getElementById('copias').value;
        return livro;
    }

    listaTabela() {
        let tbody;
        if (window.matchMedia("(max-width: 1280px)").matches) {
            tbody = document.getElementById('tbody-mobile');
            this.livrosPorPagina = this.arrayLivros.length;
        }
        else if (window.matchMedia("(min-width: 601px) and (max-width: 1366px)").matches) {
            this.livrosPorPagina = 5;
            tbody = document.getElementById('tbody-pc');

        }
        else {
            tbody = document.getElementById('tbody-pc');
            this.livrosPorPagina = 10;
        }
        tbody.innerHTML = '';

        const inicio = (this.paginaAtual - 1) * this.livrosPorPagina;
        const fim = inicio + this.livrosPorPagina;
        const livrosPaginados = this.arrayLivros.slice(inicio, fim);

        for (let i = 0; i < livrosPaginados.length; i++) {
            const livro = livrosPaginados[i];
            const tr = tbody.insertRow();

            const td_titulo = tr.insertCell();
            const td_autor = tr.insertCell();
            const td_copias = tr.insertCell();
            const td_acao = tr.insertCell();

            td_titulo.innerText = livro.name;
            td_autor.innerText = livro.author;
            td_copias.innerText = livro.totalQuantity;
            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;


            td_acao.classList.add('center');
            td_acao.classList.add('hover');
            td_copias.classList.add('center');

            td_titulo.setAttribute('data-label', 'Título:');
            td_autor.setAttribute('data-label', 'Autor:');
            td_copias.setAttribute('data-label', 'Cópias:');
            td_acao.setAttribute('data-label', 'Ação:');


            console.log();
        }

        this.criarPaginacao();
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

    putValues(dados) {
        const id = dados.id;
        document.getElementById('modalTitle').textContent = "Editar Livro"
        document.getElementById('nome').value = dados.name;
        document.getElementById('email').value = dados.email;
        document.getElementById('telephone').value = dados.telephone;
        if (dados.site == '') {
            document.getElementById('site').placeholder = "Nenhum site registrado."
        }
        else {
            document.getElementById('site').value = dados.site;
        }
        document.getElementById('save-button').setAttribute("onclick", `book.putBooks(${id})`);
        document.getElementById("userModal").style.display = "flex";

    }

    putBooks(id) {
        const dados = this.lerDados();
        console.log(dados);

        apiClient.put(`/book/${id}`, dados)
            .then(response => {
                console.log(response.data)
                document.getElementById("userForm").reset();
                this.fetchBooks()
                document.getElementById("userModal").style.display = "none";

            })
            .catch(e => {
                console.error('Erro:', e.respose?.data || e.message)
            })

    }


    postBooks() {
        const livro = this.lerDados();
        console.log(livro);

        apiClient.post('/book', livro)
            .then(response => {
                console.log(response.data);
                document.getElementById("userForm").reset();
                document.getElementById("userModal").style.display = "none";
                this.fetchBooks();
            })
            .catch(e => console.error('Erro:', e.response?.data || e.message));
    }

    fetchBooks() {
        apiClient.get('/book')
            .then(response => {
                this.popularLivros(response.data);

            })
            .catch(e => {
                console.error('Erro:', e.response?.data || e.message);
            })
    }


    popularLivros(livros) {
        this.arrayLivros = [];

        livros.forEach((livro) => {
            this.adicionar(livro);
        });
        this.listaTabela();
    }

}

const livro = new Livro();

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
    livro.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});

const searchbar = document.getElementById('searchbar');
const tabela = document.getElementById('tbody')

function search() {
    termo = searchbar.value.toLowerCase()
    termo.toLowerCase();
    let linhas = tabela.getElementsByTagName('tr');

    for (let i in linhas) {
        if (true === isNaN(i)) {
            continue
        }

        let conteudo = linhas[i].innerHTML.toLocaleLowerCase();

        if (true === conteudo.includes(termo)) {
            linhas[i].style.display = ''

        }
        else {
            linhas[i].style.display = 'none'
        }

    }

}

window.addEventListener("resize", () => {
    livro.fetchBooks();

});

window.addEventListener("DOMContentLoaded", () => {
    livro.fetchBooks();

});