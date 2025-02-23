var mysql = require('mysql2');

var bdName = "cleanupbd";


const connectionDB = {

    async executeQuery(connection, query) {
      return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },
  
    async openConnectionDB(useExecute = true){
      var connection = await mysql.createConnection(
        useExecute ? {
          host: "localhost",
          user: "root",
          password: "root",
          database: bdName 
        }: {
          host: "localhost",
          user: "root",
          password: "root"
        }
      );
      
  
      connection.connect((err) => {
          if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return false;
          }
      });
  
      return connection;
    },
  
    async endConnectionDB(connection){
      connection.end((err) => {
        if (err) {
          console.error('Erro ao fechar a conexão:', err.message);
        } else {
          console.log('Conexão com o banco encerrada com sucesso.');
        }
      });
    },
  
    // Conectar ao banco de dados
    async createDBAndTables() {
      try{
  
          let connection = await connectionDB.openConnectionDB(false); 
          if(connection == false){
              return
          }
  
          // Criar o banco de dados (se ainda não existir)
          await connectionDB.executeQuery(connection, 'CREATE DATABASE IF NOT EXISTS '+bdName);
  
          // Selecionar o banco de dados
          await connectionDB.executeQuery(connection, 'USE '+bdName);
  
  
          const createUserTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            tell VARCHAR(20) NULL,
            email VARCHAR(255) NOT NULL,
            adress INT NULL,
            password VARCHAR(40) NOT NULL,
            about TEXT NULL,
            rooms TEXT NULL
          )
        `;

          
        const infoCleaning = `CREATE TABLE IF NOT EXISTS infoCleaning (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_cleaner INT NOT NULL,
          typeCleaning VARCHAR(100) NOT NULL,
          initHourJob VARCHAR(100) NOT NULL,
          endHourJob VARCHAR(100) NOT NULL,
          cleanMaterial INT NOT NULL,
          priceDay DOUBLE NOT NULL,
          FOREIGN KEY (id_cleaner) REFERENCES users(id)
        );`


        const fav = `CREATE TABLE IF NOT EXISTS fav (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          id_cleaner INT NOT NULL,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaner) REFERENCES users(id)
        );`

        const serviceEvaluation = `CREATE TABLE IF NOT EXISTS serviceEvaluation (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          id_cleaner INT NOT NULL,
          id_cleaning INT NOT NULL,
          coment TEXT,
          qtyStar INT NOT NULL,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaner) REFERENCES users(id),
          FOREIGN KEY (id_cleaning) REFERENCES cleaning(id)
        );`

        const images = `CREATE TABLE IF NOT EXISTS images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          link VARCHAR(255) NOT NULL,
          profile INT NOT NULL,
          after INT NOT NULL,
          id_user INT NULL,
          id_cleaning INT NULL,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaning) REFERENCES cleaning(id)
        );`

        const cleaning = `CREATE TABLE IF NOT EXISTS cleaning (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          id_cleaner INT NOT NULL,
          typeClear VARCHAR(100) NOT NULL,
          date VARCHAR(100) NOT NULL,
          qtyHour INT NOT NULL,
          initHour VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          price DOUBLE NOT NULL,
          status VARCHAR(50) NOT NULL,
          rooms TEXT NOT NULL,
          address VARCHAR(255) NOT NULL,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaner) REFERENCES users(id)
        );`

        const chat = `CREATE TABLE IF NOT EXISTS chat (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          id_cleaner INT NOT NULL,
          message TEXT NOT NULL,
          vis INT NOT NULL,
          timestamp TEXT,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaner) REFERENCES users(id)
        );`

        const address = `CREATE TABLE IF NOT EXISTS address (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          address VARCHAR(255) NOT NULL,
          used INT NOT NULL,
          FOREIGN KEY (id_user) REFERENCES users(id)
        );`

        const paymentCleaning = `
        CREATE TABLE IF NOT EXISTS paymentCleaning (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_user INT NOT NULL,
          id_cleaning INT NOT NULL,
          transaction_id TEXT,
          value TEXT,
          paymentMethod TEXT,
          paymentDate TEXT,
          FOREIGN KEY (id_user) REFERENCES users(id),
          FOREIGN KEY (id_cleaning) REFERENCES cleaning(id)
        )
      `;
        
        await connectionDB.executeQuery(connection, createUserTableQuery);
        await connectionDB.executeQuery(connection, infoCleaning);
        await connectionDB.executeQuery(connection, fav);
        await connectionDB.executeQuery(connection, cleaning);
        await connectionDB.executeQuery(connection, serviceEvaluation);
        await connectionDB.executeQuery(connection, images);
        await connectionDB.executeQuery(connection, chat);
        await connectionDB.executeQuery(connection, address);
        await connectionDB.executeQuery(connection, paymentCleaning);
  
        await connectionDB.endConnectionDB(connection);

        console.log('Tabelas criadas com sucesso!');
              
      }catch(error){
          console.log("erro ao cria banco e tabelas " + error)
      }
  
    },  
}


  
module.exports = connectionDB;
