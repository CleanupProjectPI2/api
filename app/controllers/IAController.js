//É nessária a instalação da IA ollama -> https://ollama.com/download/windows
//Abrir o terminal e rodar o seguinte comando -> ollama run llama3


const axios = require("axios");

const IAController = {
    
    async iaConversation(req, res) {
        const text = "Analise a mensagem, se ela tiver o comando 'Cadastro CleanUp', responda com um texto de boas vindas a aplicação CleanUP e em seguida solicite que os seguintes dados formatados dessa forma em uma mensagem só -> Email: 'seuemail@gmail.com'; Nome:'seu nome';. Caso a mensagem não tenha o comando 'Cadastro CleanUp' e nem esteja informando  no padrão solicitado o email e o nome, responda com um texto solicitando novamente o envio das informações de email e nome no padrão dentro da mesma mensagem. Caso a mensagem tenha os dados solicitados responda com um json com os campos email, name, o campo password com uma senha de 8 digitos aleatória criada por você e o campo insert igual a true. MENSSAGEM: "+req.body.message; 
        const response = await axios.post("http://localhost:11434/api/generate", 
        {
            model:"llama3",
            prompt:text,
            stream:false
        });
        const resData = response.data.response.toString();
        res.send(resData);
    }

};


module.exports = IAController;