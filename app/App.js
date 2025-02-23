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
  
  console.log(msg.body)
  let messageResponse = await IAController.iaConversationMethod(msg.body);
  console.log(messageResponse)
  msg.reply(messageResponse);

  
});

client.initialize();