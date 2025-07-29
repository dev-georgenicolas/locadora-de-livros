const apiAxios = axios.create({
    baseURL : 'https://locadora-ryan-back.altislabtech.com.br'
})

async function getToken() {
    try {
        const response = await axios.post("https://locadora-ryan-back.altislabtech.com.br/auth/login", {
            email: "admin@gmail.com",
            password: "12345678"
        });

        console.log(response.data); // Aqui vai o token e outros dados
    } catch (error) {
        console.error("Erro ao obter token:", error.response?.data || error.message);
    }
}

getToken();
