const connectionDB = require("../ConnectionDB");

const CategoryCleaningDAO = {
    
    async insertCategoryCleaning(categoryCleaningModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var results = await connection.execute( `INSERT INTO categoryCleaning (id_category, id_cleaning) VALUES (?, ?)`, [categoryCleaningModel.id_category,  categoryCleaningModel.id_cleaning]);
            await connection.end();
            
            if(results != null) {
                console.log("Sucesso na inserção!");
                return ({result: true, message: "Sucesso na inserção!"});
            } else {
                console.log("Erro na inserção!");
                return ({result: false, message: "Erro na inserção!"});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error});
        }
    },


    async selectCategoryCleaningByCleaning(categoryCleaningModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM categoryCleaning WHERE id_cleaning = ?', [categoryCleaningModel.id_cleaning]);
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            } else {
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },


    async deleteCategoryCleaning(categoryCleaningModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(`DELETE FROM categoryCleaning WHERE id = ?`, [categoryCleaningModel.id]);
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na remoção!");
                return ({result: true, message: "Sucesso na remoção!"});
            } else {
                console.log("Erro na remoção!");
                return ({result: false, message: "Erro na remoção!"});
            }
        } catch(error) {
            return ({result: false, message: error});
        }
    },
};

module.exports = CategoryCleaningDAO;
