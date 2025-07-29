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
        livro.isbn = document.getElementById('isbn').value;
        livro.genero = document.getElementById('genero').value;
        livro.copias = document.getElementById('copias').value;
        return livro;
    }

    listaTabela() {
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        const inicio = (this.paginaAtual - 1) * this.livrosPorPagina;
        const fim = inicio + this.livrosPorPagina;
        const livrosPaginados = this.arrayLivros.slice(inicio, fim);

        for (let i = 0; i < livrosPaginados.length; i++) {
            const livro = livrosPaginados[i];
            const tr = tbody.insertRow();

            const td_titulo = tr.insertCell();
            const td_autor = tr.insertCell();
            const td_isbn = tr.insertCell();
            const td_genero = tr.insertCell();
            const td_copias = tr.insertCell();
            const td_acao = tr.insertCell();

            td_titulo.innerText = livro.titulo;
            td_autor.innerText = livro.autor;
            td_isbn.innerText = livro.isbn;
            td_genero.innerText = livro.genero;
            td_copias.innerText = livro.copias;

            td_acao.classList.add('center');
            td_copias.classList.add('center');
            td_genero.classList.add('center');

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;

            console.log();
        }

        this.criarPaginacao();
    }


    popularLivros() {
        const livros = [
            { titulo: "Dom Casmurro", autor: "Machado de Assis", isbn: "123456789", genero: "Romance", copias: "5" },
            { titulo: "1984", autor: "George Orwell", isbn: "987654321", genero: "Ficção", copias: "8" },
            { titulo: "O Hobbit", autor: "J.R.R. Tolkien", isbn: "456789123", genero: "Fantasia", copias: "3" },
            { titulo: "A Revolução dos Bichos", autor: "George Orwell", isbn: "112233445", genero: "Sátira", copias: "4" },
            { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", isbn: "998877665", genero: "Filosófico", copias: "6" },
            { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", isbn: "123123123", genero: "Fantasia", copias: "10" },
            { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", isbn: "321321321", genero: "Fábula", copias: "7" },
            { titulo: "O Código Da Vinci", autor: "Dan Brown", isbn: "654987321", genero: "Suspense", copias: "5" },
            { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", isbn: "111222333", genero: "Fantasia", copias: "4" },
            { titulo: "Capitães da Areia", autor: "Jorge Amado", isbn: "999888777", genero: "Drama", copias: "3" },
            { titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", isbn: "774411223", genero: "Autoajuda", copias: "6" },
            { titulo: "Mindset", autor: "Carol S. Dweck", isbn: "665544332", genero: "Psicologia", copias: "5" },
            { titulo: "O Poder do Hábito", autor: "Charles Duhigg", isbn: "889900112", genero: "Autoajuda", copias: "9" },
            { titulo: "Percy Jackson e o Ladrão de Raios", autor: "Rick Riordan", isbn: "333444555", genero: "Fantasia", copias: "7" },
            { titulo: "Jogador Nº 1", autor: "Ernest Cline", isbn: "111999888", genero: "Ficção Científica", copias: "4" },
            { titulo: "Duna", autor: "Frank Herbert", isbn: "123987456", genero: "Ficção Científica", copias: "5" },
            { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", isbn: "543216789", genero: "Drama", copias: "6" },
            { titulo: "O Diário de Anne Frank", autor: "Anne Frank", isbn: "121212121", genero: "Biografia", copias: "8" },
            { titulo: "As Crônicas de Nárnia", autor: "C.S. Lewis", isbn: "456123789", genero: "Fantasia", copias: "10" },
            { titulo: "A Guerra dos Tronos", autor: "George R. R. Martin", isbn: "777666555", genero: "Fantasia", copias: "5" }
        ];


        livros.forEach(livro => this.adicionar(livro));
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

const livro = new Livro();

window.addEventListener("DOMContentLoaded", () => {
    livro.popularLivros();
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
    livro.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});