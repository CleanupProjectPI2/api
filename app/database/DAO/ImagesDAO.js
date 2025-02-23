const connectionDB = require("../ConnectionDB");

const ImagesDAO = {
    
    async insertImage(imageModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            console.log(imageModel)
            var result = await connection.execute(
                `INSERT INTO images (link, profile, after, id_user, id_cleaning) VALUES (?, ?, ?, ?, ?)`, 
                [
                    imageModel.link, 
                    imageModel.profile, 
                    imageModel.after, 
                    imageModel.id_user, 
                    imageModel.id_cleaning
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

    async selectImage(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM images WHERE id = ?`, [id]);

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na seleção!", data: result[0] });
            } else {
                return ({ result: false, message: "Erro na seleção!", data: [] });
            }
        } catch(error) {
            return ({ result: false, message: error, data: [] });
        }
    },

    async selectImageByUser(id_user) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM images WHERE id_user = ?`, [id_user]);

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na seleção!", data: result });
            } else {
                return ({ result: false, message: "Erro na seleção!", data: [] });
            }
        } catch(error) {
            return ({ result: false, message: error, data: [] });
        }
    },

    async selectImageByCleaning(id_cleaning) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM images WHERE id_cleaning = ?`, [id_cleaning]);

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na seleção!", data: result });
            } else {
                return ({ result: false, message: "Erro na seleção!", data: [] });
            }
        } catch(error) {
            return ({ result: false, message: error, data: [] });
        }
    },

    async deleteImage(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM images WHERE id = ?`, [id]);

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na remoção!" });
            } else {
                return ({ result: false, message: "Erro na remoção!" });
            }
        } catch(error) {
            return ({ result: false, message: error });
        }
    }

};

module.exports = ImagesDAO;
