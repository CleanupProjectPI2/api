//É nessária a instalação da IA ollama -> https://ollama.com/download/windows
//Abrir o terminal e rodar o seguinte comando -> ollama run llama3


const axios = require("axios");

const  UserDAO  = require('../database/DAO/UserDAO');

const IAController = {
    
    async iaConversation(req, res) {
        const text = "Analise a mensagem, se ela tiver o comando '/CadastroCleanUp', responda com um texto de boas vindas à aplicação CleanUP e em seguida solicite que o email e o nome da pessoa sejam informados em uma única mensagem. Caso a mensagem não tenha o comando '/CadastroCleanUp' e nem  tenha sido informado o email e o nome da pessoa, responda com um texto solicitando novamente o envio das informações de email e nome. Caso a mensagem tenha os dados solicitados responda com o campo dataRegister preenchido com um json com os campos email, name, o campo password com uma senha de 8 digitos aleatória criada por você, não esqueça de marcar o campo insert como true e no campo message responda informando que o cadastro foi realizado e informe a senha ao usuário, avisando também que ele já pode fazer logiin no app CleanUP. Lembre-se, toda resposta sua deve vir no seguinte padrão json {insert: boolean, dataRegister: {}, message:'sua resposta'}, nada fora desse padrão e nada além disso. MENSSAGEM A SER ANALISADA: "+req.body.message; 
        const response = await axios.post("http://localhost:11434/api/generate", 
        {
            model:"llama3",
            prompt:text,
            stream:false
        });
        const resData = response.data.response.toString();
        res.send(resData);
    },

    async iaConversationMethod(message) {

        if (/[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}/.test(message) && /\bNome:\s*[A-Za-z]+/.test(message)) {
            let email = message.match(/[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}/)[0];
            let name = message.match(/\bNome:\s*([A-Za-z]+)/)[1];
            
            // Gerar senha aleatória de 8 dígitos
            let password = Math.random().toString(36).slice(-8);
            
        
            let user = {name: name, tell: "", email: email, password: password, about:"", rooms: ""}
            
            let existUser = await UserDAO.selectUserByEmail(user);
            console.log(existUser);
            if(existUser.result){
                if(existUser.data.length == 0){
                    console.log(user);
                    let result = await UserDAO.insertUser(user);
                    console.log(result);
                    return `Cadastro realizado com sucesso! Sua senha é *${password}*. Agora você já pode fazer login no app CleanUP.`;
                }else{
                    return `Ops.. Esse email já está cadastrado :(, tente novamente com outro email.` 
                }    
            }else{
                console.log(user);
                let result = await UserDAO.insertUser(user);
                console.log(result);
                return `Cadastro realizado com sucesso! Sua senha é *${password}*. Agora você já pode fazer login no app CleanUP.`;
            }
            
        }

        const text =`
        Analise a mensagem recebida. Se a mensagem contiver o comando '/CadastroCleanUp', responda com uma mensagem de boas-vindas à aplicação CleanUP, se apresentando como uma avatar (Mulher) chamada Waycleaner. Solicite também que o usuário informe o email e o nome em uma única mensagem com o nome do campo antes de cada informação, envie esse exemplo na mensagem : Email: seuemail@example.com Nome: Seu Nome
        
        Caso a mensagem não contenha o comando '/CadastroCleanUp' e também não tenha os dados de email e nome, retorne uma resposta solicitando que o usuário envie essas informações e o ajudando no que ele precisa, sempre o oritentando a informar o email e o nome para a realização do cadastro.
        
        Caso seja uma reclamação ou algo do tipo, peça para o cliente entrar em contato com o suporte via app CleanUp.

        Caso não tenha entendido a mensagem, retorne uma mensagem falando "Desculpe, não entendi a mensagem, pode enviar novamente?"

        MENSAGEM A SER ANALISADA: 
        `+message;


        const response = await axios.post("http://localhost:11434/api/generate", 
        {
            model:"llama3",
            prompt:text,
            stream:false
        });

        console.log(response.data.response);

        return response.data.response;
       
    }

};


module.exports = IAController;