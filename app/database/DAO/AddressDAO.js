const connectionDB = require("../ConnectionDB");

const AddressDAO = {
    
    async insertAddress(addressModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `INSERT INTO address (id_user, address, used) VALUES (?, ?, ?)`, 
                [addressModel.id_user, addressModel.address,  addressModel.used]
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

    async updateAddress(addressModel) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(
                `UPDATE address SET address = ? WHERE id = ?`, 
                [addressModel.address, addressModel.id]
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

    async selectAddress(id_user) {
        try {
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.execute(`SELECT * FROM address WHERE id_user = ?`, [id_user]);

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

    async deleteAddress(id) {
        try {
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM address WHERE id = ?`, [id]);

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

module.exports = AddressDAO;
