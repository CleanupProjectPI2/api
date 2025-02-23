const connectionDB = require("../ConnectionDB");

const PaymentCleaningDAO = {
    
    async insertPaymentCleaning(paymentModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO paymentCleaning (id_user, id_cleaning, transaction_id, value, paymentMethod, paymentDate) VALUES (?, ?, ?, ?, ?, ?)`, 
                [
                    paymentModel.id_user, 
                    paymentModel.id_cleaning, 
                    paymentModel.transaction_id, 
                    paymentModel.value, 
                    paymentModel.paymentMethod, 
                    paymentModel.paymentDate
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

    async selectPaymentCleaning(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM paymentCleaning WHERE id = ?`, [id]);

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

    async selectPaymentCleaningByUser(id_user) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM paymentCleaning WHERE id_user = ?`, [id_user]);

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

    async selectPaymentCleaningByCleaning(id_cleaning) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM paymentCleaning WHERE id_cleaning = ?`, [id_cleaning]);

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



    async deletePaymentCleaning(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM paymentCleaning WHERE id = ?`, [id]);

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

module.exports = PaymentCleaningDAO;
