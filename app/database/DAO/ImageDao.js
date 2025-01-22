const connectionDB = require("../ConnectionDB");

const ImageDao = {
    
    async insertImageCleaning(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`INSERT INTO imagesCleaning(id_user, link, profile, after, id_cleaning ) VALUES (?,?,?,?,?)`, [ imageModel.id_user, imageModel.link, imageModel.profile, imageModel.after, imageModel.id_cleaning]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na inseção!");
                return ({result: true, message: "Sucesso na inseção!"});
            }else{
                console.log("Erro na inseção!");
                return ({result: false, message: "Erro na inseção!"});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error});
        }
    },


    async selectAllImageCleaning(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM imagesCleaning WHERE id_cleaning = ?', [imageModel.id_cleaning]);
            
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

    async selectImageCleaningById(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM imagesCleaning WHERE id = ?', [imageModel.id]);
            
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

    async deleteImageCleaning(imageModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM imagesCleaning WHERE id = ?`, [imageModel.id]);
            
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
        
    },

    async deleteAllImageCleaning(imageModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM imagesCleaning WHERE id_cleaning = ?`, [imageModel.id_cleaning]);
            
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
  
  
  
  module.exports = ImageDao;


  