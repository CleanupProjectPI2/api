const connectionDB = require("../ConnectionDB");

const ChatDAO = {
    
    async insertChat(chatModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO chat (id_user, id_cleaner, message, timestamp, vis) VALUES (?, ?, ?, ?, ?)`, 
                [chatModel.id_user, chatModel.id_cleaner, chatModel.message, chatModel.timestamp, chatModel.vis]
            );

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na inserção!" });
            } else {
                return ({ result: false, message: "Erro na inserção!" });
            }
        } catch(error) {
            return ({ result: false, message: error });
        }
    },

    async selectChat(chatModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.execute(`SELECT * FROM chat WHERE id_cleaner = ? AND  id_user = ? `, [chatModel.id_cleaner, chatModel.id_user]);

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

    async deleteChat(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM chat WHERE id_cleaner = ? AND  id_user = ? `, [chatModel.id_cleaner, chatModel.id_user]);

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

module.exports = ChatDAO;
