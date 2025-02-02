const connectionDB = require("../ConnectionDB");

const UserDAO = {
    
    async insertUser(user) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO users (name, tell, email, password, about, rooms) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [
                    user.name, 
                    user.tell, 
                    user.email, 
                    user.password, 
                    user.about, 
                    user.rooms
                ]
            );

            await connection.end();

            if (result != null) {
                return ({ result: true, message: "Sucesso na inserção!" });
            } else {
                return ({ result: false, message: "Erro na inserção!" });
            }
        } catch (error) {
            return ({ result: false, message: error });
        }
    },

    async selectUser(userModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM users WHERE email = ? AND password = ?', [userModel.email, userModel.password]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },

    async updateUser(userModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE users SET name = ?, tell = ?, email = ?, password = ?, about = ?, rooms = ?, WHERE id = ?`, [userModel.name, userModel.tell, userModel.email, userModel.password, userModel.about, userModel.rooms, userModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na atualização!");
                return ({result: true, message: "Sucesso na atualização!"});
            }else{
                console.log("Erro na atualização!");
                return ({result: false, message: "Erro na atualização!"});
            }
        }catch(error){
            return ({result: false, message: error});
        }
        
    },

    async deleteUser(userModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM users WHERE id = ?`, [userModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na remoção!");
                return ({result: true, message: "Sucesso na remoção!"});
            }else{
                console.log("Erro na remoção!");
                return ({result: false, message: "Erro na remoção!"});
            }
        }catch(error){
            return ({result: false, message: error});
        }
        
    }


  
    
  };
  
  
  
  module.exports = UserDAO;


  