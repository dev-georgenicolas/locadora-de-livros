class Livro {
    constructor() {
        this.id = 1;
        this.arrayLivros = [];
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
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayLivros.length; i++) {
            let tr = tbody.insertRow();

            let td_titulo = tr.insertCell();
            let td_autor = tr.insertCell();
            let td_isbn = tr.insertCell();
            let td_genero = tr.insertCell();
            let td_copias = tr.insertCell();
            let td_acao = tr.insertCell();

            td_titulo.innerText = this.arrayLivros[i].titulo;
            td_autor.innerText = this.arrayLivros[i].autor;
            td_isbn.innerText = this.arrayLivros[i].isbn;
            td_genero.innerText = this.arrayLivros[i].genero;
            td_copias.innerText = this.arrayLivros[i].copias;
            td_acao.classList.add('center');

            td_acao.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                </svg>`;
        }
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