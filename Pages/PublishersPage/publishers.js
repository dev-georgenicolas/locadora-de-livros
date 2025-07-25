class Editora {
    constructor() {
        this.id = 1;
        this.arrayEditoras = [];
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
}

const editora = new Editora();

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