

async function getToken() {
    var email = document.getElementById('email-input').value;
    var senha = document.getElementById('senha-input').value;

    axios.post("https://locadora-ryan-back.altislabtech.com.br/auth/login", {
        email: email,
        password: senha
    })
        .then(response => {
            console.log(response.data)
            const token = response.data.token
            localStorage.setItem('token', token);
            window.location.href = "../html/dashboard.html";
                        
        })
        .catch(e => {
            console.error("Erro ao obter token:", e.response?.data || e.message);
        })

}

