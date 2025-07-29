class Usuario {
    constructor() {
        this.id = 1;
        this.arrayUsuarios = [];
    }

    salvar() {
        let user = this.lerDados();
        this.adiconar(user);
        this.listaTabela();
    }

    adiconar(usuario) {
        this.arrayUsuarios.push(usuario);
        this.id++;
    }

    lerDados() {
        let user = {}

        user.nome = document.getElementById('nome').value;
        user.email = document.getElementById('email').value;
        user.senha = document.getElementById('senha').value;
        user.permissao = document.getElementById('permissao').value;

        return user;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayUsuarios.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_senha = tr.insertCell();
            let td_permissao = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = this.arrayUsuarios[i].nome;
            td_email.innerText = this.arrayUsuarios[i].email;
            td_senha.innerText = this.arrayUsuarios[i].senha;
            td_permissao.innerText = this.arrayUsuarios[i].permissao;
            td_permissao.classList.add('center');
            td_acao.classList.add('center');

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
        }
    }

    popularUsuarios() {
        const usuarios = [
            { nome: "Ana Silva", email: "ana@email.com", senha: "1234", permissao: "Admin" },
            { nome: "Bruno Costa", email: "bruno@email.com", senha: "abcd", permissao: "Usuário" },
            { nome: "Carlos Lima", email: "carlos@email.com", senha: "4321", permissao: "Usuário" },
            { nome: "Daniela Souza", email: "daniela@email.com", senha: "senha", permissao: "Usuário" },
            { nome: "Eduardo Rocha", email: "edu@email.com", senha: "qwerty", permissao: "Usuário" },
            { nome: "Fernanda Alves", email: "fer@email.com", senha: "asdf", permissao: "Admin" },
            { nome: "Gabriel Mendes", email: "gabriel@email.com", senha: "pass", permissao: "Usuário" },
            { nome: "Helena Dias", email: "helena@email.com", senha: "admin", permissao: "Usuário" },
            { nome: "Igor Ramos", email: "igor@email.com", senha: "root", permissao: "Usuário" },
            { nome: "Julia Fernandes", email: "julia@email.com", senha: "123456", permissao: "Admin" }
        ];

        usuarios.forEach((usuario) => {
            this.adiconar(usuario);
        });

        this.listaTabela();
    }

}

var user = new Usuario();

window.addEventListener("DOMContentLoaded", () => {
    user.popularUsuarios();
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
    user.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});