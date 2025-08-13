const token = localStorage.getItem('token')

const apiClient = axios.create({
    baseURL: "https://locadora-ryan-back.altislabtech.com.br",
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});


class Editora {
    constructor() {
        this.arrayEditoras = [];
        this.editorasPorPagina = 10;
        this.paginaAtual = 1;
    }

    adicionar(editora) {
        this.arrayEditoras.push(editora);
    }

    lerDados() {
        let editora = {};
        editora.name = document.getElementById('nome').value;
        editora.email = document.getElementById('email').value;
        editora.telephone = document.getElementById('telephone').value;
        editora.site = document.getElementById('site').value;
        return editora;
    }

    listaTabela() {
        let tbody;
        if (window.matchMedia("(max-width: 600px)").matches) {
            tbody = document.getElementById('tbody-mobile');
            this.editorasPorPagina = this.arrayEditoras.length;
        }
        else if (window.matchMedia("(min-width: 601px) and (max-width: 1366px)").matches) {
            this.editorasPorPagina = 5;
            tbody = document.getElementById('tbody-pc');

        }
        else {
            tbody = document.getElementById('tbody-pc');
            this.editorasPorPagina = 10;
        }
        tbody.innerHTML = '';

        const inicio = (this.paginaAtual - 1) * this.editorasPorPagina;
        const fim = inicio + this.editorasPorPagina;
        const editorasPaginadas = this.arrayEditoras.slice(inicio, fim);

        for (let i = 0; i < editorasPaginadas.length; i++) {
            const editora = editorasPaginadas[i];
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_telephone = tr.insertCell();
            let td_site = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = editora.name;
            td_email.innerText = editora.email;
            td_telephone.innerText = editora.telephone;
            if (editora.site == '') {
                td_site.innerText = 'Nenhum site registrado.'
            }
            else {
                td_site.innerText = editora.site;
            }
            td_acao.classList.add('center');
            td_acao.classList.add('hover');
            td_site.classList.add('center');
            td_telephone.classList.add('right');

            td_nome.setAttribute('data-label', 'Nome:')
            td_email.setAttribute('data-label', 'Email:')
            td_telephone.setAttribute('data-label', 'Telefone:')
            td_site.setAttribute('data-label', 'Site:')
            td_acao.setAttribute('data-label', 'Ação:')

            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
            td_acao.setAttribute("onclick", `publisher.putValues(${JSON.stringify(editora)})`);
        }
        this.criarPaginacao()
    }



    criarPaginacao() {
        const totalPaginas = Math.ceil(this.arrayEditoras.length / this.editorasPorPagina);
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
        document.getElementById('modalTitle').textContent = "Editar Editora"
        document.getElementById('nome').value = dados.name;
        document.getElementById('email').value = dados.email;
        document.getElementById('telephone').value = dados.telephone;
        if (dados.site == '') {
            document.getElementById('site').placeholder = "Nenhum site registrado."
        }
        else {
            document.getElementById('site').value = dados.site;
        }
        document.getElementById('save-button').setAttribute("onclick", `publisher.putPublishers(${id})`);
        document.getElementById("userModal").style.display = "flex";

    }

    putPublishers(id) {
        const dados = this.lerDados();
        console.log(dados);

        apiClient.put(`/publisher/${id}`, dados)
            .then(response => {
                console.log(response.data)
                document.getElementById("userForm").reset();
                this.fetchPublishers()
                document.getElementById("userModal").style.display = "none";

            })
            .catch(e => {
                console.error('Erro:', e.respose?.data || e.message)
            })

    }


    postPublishers() {
        const editora = this.lerDados();
        console.log(editora);

        apiClient.post('/publisher', editora)
            .then(response => {
                console.log(response.data);
                document.getElementById("userForm").reset();
                document.getElementById("userModal").style.display = "none";
                this.fetchPublishers();
            })
            .catch(e => console.error('Erro:', e.response?.data || e.message));
    }

    fetchPublishers() {

        apiClient.get('/publisher')
            .then(response => {
                this.popularEditoras(response.data);

            })
            .catch(e => {
                console.error('Erro:', e.response?.data || e.message);
            })
    }


    popularEditoras(editoras) {
        this.arrayEditoras = [];

        editoras.forEach((editora) => {
            this.adicionar(editora);
        });
        this.listaTabela();
    }



}

const publisher = new Editora();


document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();
});

document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("modalTitle").textContent = "Adicionar Editora";
    document.getElementById('site').placeholder = ""
    document.getElementById('save-button').setAttribute("onclick", "publisher.postPublishers()");

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


const searchbar = document.getElementById('searchbar');
const tabela = document.getElementById('tbody')

function search() {
    termo = searchbar.value.toLowerCase()
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
    publisher.fetchPublishers();

});



window.addEventListener("DOMContentLoaded", () => {
    publisher.fetchPublishers();

});
