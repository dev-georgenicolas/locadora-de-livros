
class Locatario {
    constructor() {
        this.id = 1;
        this.arrayLocatarios = [];
    }

    salvar() {
        const locatario = this.lerDados();
        this.adicionar(locatario);
        this.listaTabela();
    }

    adicionar(locatario) {
        this.arrayLocatarios.push(locatario);
        this.id++;
    }

    lerDados() {
        let locatario = {};
        locatario.id = this.id;
        locatario.nome = document.getElementById('nome').value;
        locatario.email = document.getElementById('email').value;
        locatario.endereco = document.getElementById('endereco').value;
        locatario.telefone = document.getElementById('telefone').value;
        return locatario;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayLocatarios.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_endereco = tr.insertCell();
            let td_telefone = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = this.arrayLocatarios[i].nome;
            td_email.innerText = this.arrayLocatarios[i].email;
            td_endereco.innerText = this.arrayLocatarios[i].endereco;
            td_telefone.innerText = this.arrayLocatarios[i].telefone;
            td_acao.classList.add('center');
            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;


        }
    }

    popularLocatarios() {
        const locatarios = [
            { nome: "Ana Clara", email: "ana@gmail.com", endereco: "Rua das Flores, 123", telefone: "(11) 98888-1234" },
            { nome: "Carlos Silva", email: "carlos@gmail.com", endereco: "Av. Brasil, 456", telefone: "(21) 97777-5678" },
            { nome: "Beatriz Souza", email: "bia@gmail.com", endereco: "Rua Verde, 789", telefone: "(31) 96666-9101" },
            { nome: "João Pedro", email: "joao@gmail.com", endereco: "Travessa Azul, 321", telefone: "(41) 95555-1112" },
            { nome: "Marina Oliveira", email: "marina@gmail.com", endereco: "Alameda Sol, 654", telefone: "(51) 94444-1314" },
            { nome: "Felipe Gomes", email: "felipe@gmail.com", endereco: "Rua Nova, 987", telefone: "(61) 93333-1516" },
            { nome: "Larissa Lima", email: "larissa@gmail.com", endereco: "Av. Central, 852", telefone: "(71) 92222-1718" },
            { nome: "Lucas Ferreira", email: "lucas@gmail.com", endereco: "Rua do Porto, 741", telefone: "(81) 91111-1920" },
            { nome: "Juliana Costa", email: "juliana@gmail.com", endereco: "Rua Esperança, 369", telefone: "(91) 90000-2122" },
            { nome: "Bruno Rocha", email: "bruno@gmail.com", endereco: "Travessa das Árvores, 159", telefone: "(85) 98888-2324" }
        ];

        locatarios.forEach(loc => this.adicionar(loc));
        this.listaTabela();
    }



}


const locatario = new Locatario();

window.addEventListener("DOMContentLoaded", () => {
    locatario.popularLocatarios();
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
    locatario.salvar();
    document.getElementById("userForm").reset();
    document.getElementById("userModal").style.display = "none";
});
