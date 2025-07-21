class Aluguel {
    constructor() {
        this.id = 1;
        this.arrayAlugueis = [];
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

        for (let i = 0; i < this.arrayAlugueis.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_livro = tr.insertCell();
            let td_data = tr.insertCell();
            let td_status = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = this.arrayAlugueis[i].nome;
            td_livro.innerText = this.arrayAlugueis[i].livro;
            td_data.innerText = this.arrayAlugueis[i].data;
            td_status.innerText = this.arrayAlugueis[i].status;
            td_acao.classList.add('center');

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
        }
    }


}

var aluguel = new Aluguel();

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
