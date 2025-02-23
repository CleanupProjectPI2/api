const routes = require('./routes/Routes.js')
const dbtables = require("./database/ConnectionDB.js");
const bodyParser = require('body-parser')
const express = require("express");
const cors = require('cors');

const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const IAController = require('./controllers/IAController.js');



const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

dbtables.createDBAndTables();

const port = 3001;
app.listen(port, () => {
    console.log('Servindo arquivos estáticos da pasta:', path.join(__dirname, 'public/uploads'));
    console.log("Runing! - Servidor iniciado e executando na porta: " + port);
});

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot está pronto!');
});

client.on('message', async msg => {
  /*if (msg.body === 'Cadastro') {
    msg.reply('Por favor, envie seu nome e e-mail para cadastro.\nExemplo:\nNome: Seu Nome\nEmail: seuemail@email.com');
  }

  if (msg.body.includes('Nome:') && msg.body.includes('Email:')) {
    const [_, nome, email] = msg.body.split(/\n+/);
    const novoUsuario = { 
      nome: nome.replace('Nome: ', ''), 
      email: email.replace('Email: ', '') 
    };

    // Inserir os dados diretamente no banco
    try {
      const usuario = await UserDAO.insertUser(novoUsuario);
      msg.reply('Cadastro realizado com sucesso!');
    } catch (error) {
      msg.reply('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
  }*/
  console.log(msg.body)
  let messageResponse = await IAController.iaConversationMethod(msg.body);
  console.log(messageResponse)
  msg.reply(messageResponse);

  
});

client.initialize();