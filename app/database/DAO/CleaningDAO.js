const connectionDB = require("../ConnectionDB");

const CleaningDAO = {
    
    async insertCleaning(cleaningModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO cleaning (id_user, id_cleaner, typeClear, date, qtyHour, initHour, description, price, status, rooms, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    cleaningModel.id_user, 
                    cleaningModel.id_cleaner, 
                    cleaningModel.typeClear, 
                    cleaningModel.date, 
                    cleaningModel.qtyHour, 
                    cleaningModel.initHour, 
                    cleaningModel.description, 
                    cleaningModel.price, 
                    cleaningModel.status, 
                    cleaningModel.rooms, 
                    cleaningModel.address
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

    async selectCleaning(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.execute(`SELECT * FROM cleaning WHERE id = ?`, [id]);

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

    async selectCleaningByUser(id_user) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.execute(`SELECT * FROM cleaning WHERE id_user = ?`, [id_user]);

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

    async selectCleaningByCleaner(id_cleaner) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.execute(`SELECT * FROM cleaning WHERE id_cleaner = ?`, [id_cleaner]);

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

    async updateCleaning(cleaningModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `UPDATE cleaning SET status = ? WHERE id = ?`, 
                [cleaningModel.status, cleaningModel.id]
            );

            await connection.end();

            if(result != null) {
                return ({ result: true, message: "Sucesso na atualização!" });
            } else {
                return ({ result: false, message: "Erro na atualização!" });
            }
        } catch(error) {
            return ({ result: false, message: error });
        }
    },

    async deleteCleaning(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM cleaning WHERE id = ?`, [id]);

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

module.exports = CleaningDAO;
