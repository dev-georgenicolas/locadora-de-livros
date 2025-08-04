const token = localStorage.getItem('token')

const apiClient = axios.create({
    baseURL: "https://locadora-ryan-back.altislabtech.com.br",
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});


class Usuario {
    constructor() {

        this.arrayUsuarios = [];
        this.usuariosPorPagina = 10;
        this.paginaAtual = 1;
    }

    salvar() {
        let user = this.lerDados();
        this.adicionar(user);
        this.listaTabela();
    }

    adicionar(usuario) {
        this.arrayUsuarios.push(usuario);
        this.id++;
    }

    lerDados() {
        let user = {}
        user.name = document.getElementById('nome').value;
        user.email = document.getElementById('email').value;
        user.role = document.getElementById('permissao').value;
        return user;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        const inicio = (this.paginaAtual - 1) * this.usuariosPorPagina;
        const fim = inicio + this.usuariosPorPagina;
        const usuariosPaginados = this.arrayUsuarios.slice(inicio, fim);

        for (let i = 0; i < usuariosPaginados.length; i++) {
            const usuario = usuariosPaginados[i];
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_permissao = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = usuario.name;
            td_email.innerText = usuario.email;
            td_permissao.innerText = usuario.role;
            td_permissao.classList.add('center');
            td_acao.classList.add('center');
            td_acao.classList.add('hover');


            td_acao.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
            td_acao.setAttribute("onclick", `user.putValues(${JSON.stringify(usuario)})`);
        }

        this.criarPaginacao()
    }

    criarPaginacao() {
        const totalPaginas = Math.ceil(this.arrayUsuarios.length / this.usuariosPorPagina);
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
        document.getElementById('modalTitle').textContent = "Editar Usuario"
        document.getElementById('nome').value = dados.name;
        document.getElementById('email').value = dados.email;
        document.getElementById('telephone').value = dados.telephone;
        if (dados.site == '') {
            document.getElementById('site').placeholder = "Nenhum site registrado."
        }
        else {
            document.getElementById('site').value = dados.site;
        }
        document.getElementById('save-button').setAttribute("onclick", `user.putUsers(${id})`);
        document.getElementById("userModal").style.display = "flex";

    }

    putUsers(id) {
        const dados = this.lerDados();
        console.log(dados);

        apiClient.put(`/user/${id}`, dados)
            .then(response => {
                console.log(response.data)
                document.getElementById("userForm").reset();
                this.fetchUsers()
                document.getElementById("userModal").style.display = "none";

            })
            .catch(e => {
                console.error('Erro:', e.respose?.data || e.message)
            })

    }


    postUsers() {
        const usuario = this.lerDados();
        console.log(usuario);

        apiClient.post('/user', usuario)
            .then(response => {
                console.log(response.data);
                document.getElementById("userForm").reset();
                document.getElementById("userModal").style.display = "none";
                this.fetchUsers();
            })
            .catch(e => console.error('Erro:', e.response?.data || e.message));
    }

    fetchUsers() {

        apiClient.get('/user')
            .then(response => {
                this.popularUsuarios(response.data);

            })
            .catch(e => {
                console.error('Erro:', e.response?.data || e.message);
            })
    }


    popularUsuarios(usuarios) {
        this.arrayUsuarios = [];

        usuarios.forEach((usuario) => {
            this.adicionar(usuario);
        });
        this.listaTabela();
    }



}

var user = new Usuario();

var userList;

function fetchUsers() {
    apiClient.get('/user')
        .then(response => {
            userList = response.data;
            user.popularUsuarios(userList);
        })
        .catch(e => {
            console.error('Erro:', e.response?.data || e.message);
        })
}

window.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
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

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    user.salvar();
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