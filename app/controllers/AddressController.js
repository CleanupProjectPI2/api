const AddressDAO = require("../database/DAO/AddressDAO");
const AddressModel = require("../model/AddressModel");

const AddressController = {
    async insertAddress(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let address = new AddressModel(req.body);
                if (address.id_user && address.address && address.used) {
                    let result = await AddressDAO.insertAddress(address);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao cadastrar endereço'
                        });
                    } else {
                        res.status(500).json({
                            'type': "E",
                            'message': result.message
                        });
                    }
                } else {
                    res.status(400).json({
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios"
                    });
                }
            } else {
                res.status(400).json({
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async updateAddress(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let address = new AddressModel(req.body);
                if (address.id && address.address) {
                    let result = await AddressDAO.updateAddress(address);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao atualizar endereço'
                        });
                    } else {
                        res.status(500).json({
                            'type': "E",
                            'message': result.message
                        });
                    }
                } else {
                    res.status(400).json({
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios"
                    });
                }
            } else {
                res.status(400).json({
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async selectAddress(req, res) {
        try {
            let id_user = req.params.id_user;
            if (id_user) {
                let result = await AddressDAO.selectAddress(id_user);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Endereço(s) encontrado(s)'
                    });
                } else {
                    res.status(404).json({
                        'type': "E",
                        'message': result.message
                    });
                }
            } else {
                res.status(400).json({
                    'type': "E",
                    'message': "ID do usuário não fornecido"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async deleteAddress(req, res) {
        try {
            let id = req.params.id;
            if (id) {
                let result = await AddressDAO.deleteAddress(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'message': 'Endereço deletado com sucesso'
                    });
                } else {
                    res.status(500).json({
                        'type': "E",
                        'message': result.message
                    });
                }
            } else {
                res.status(400).json({
                    'type': "E",
                    'message': "ID do endereço não fornecido"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    }
};

module.exports = AddressController;
