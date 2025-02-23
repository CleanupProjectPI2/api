const connectionDB = require("../ConnectionDB");

const ServiceEvaluationDAO = {
    
    async insertServiceEvaluation(evaluationModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO serviceEvaluation (id_user, id_cleaner, id_cleaning, coment, qtyStar) VALUES (?, ?, ?, ?, ?)`, 
                [evaluationModel.id_user, evaluationModel.id_cleaner, evaluationModel.id_cleaning, evaluationModel.coment, evaluationModel.qtyStar]
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

    async selectServiceEvaluation(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM serviceEvaluation WHERE id_cleaning = ?`, [id]);

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

    async selectServiceEvaluationByCleaner(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute(`SELECT * FROM serviceEvaluation WHERE id_cleaner = ?`, [id]);

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

    async deleteServiceEvaluation(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM serviceEvaluation WHERE id = ?`, [id]);

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

module.exports = ServiceEvaluationDAO;
