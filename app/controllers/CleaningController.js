const CleaningDAO = require("../database/DAO/CleaningDAO");
const CleaningModel = require("../model/CleaningModel");

const CleaningController = {
    async insertCleaning(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let cleaning = new CleaningModel(req.body);
                if (cleaning.id_user && cleaning.id_cleaner && cleaning.typeClear && cleaning.date && cleaning.qtyHour && cleaning.initHour && cleaning.description && cleaning.price && cleaning.status && cleaning.rooms && cleaning.address) {
                    let result = await CleaningDAO.insertCleaning(cleaning);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao cadastrar limpeza'
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

    async selectCleaning(req, res) {
        try {
            let id = req.params.id;
            if (id) {
                let result = await CleaningDAO.selectCleaning(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Limpeza encontrada'
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
                    'message': "ID da limpeza não fornecido"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async selectCleaningByUser(req, res) {
        try {
            let id_user = req.params.id_user;
            if (id_user) {
                let result = await CleaningDAO.selectCleaningByUser(id_user);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Limpeza(s) encontrada(s) para o usuário'
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

    async selectCleaningByCleaner(req, res) {
        try {
            let id_cleaner = req.params.id_cleaner;
            if (id_cleaner) {
                let result = await CleaningDAO.selectCleaningByCleaner(id_cleaner);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Limpeza(s) encontrada(s) para o limpador'
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
                    'message': "ID do limpador não fornecido"
                });
            }
        } catch (error) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async updateCleaning(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let cleaning = new CleaningModel(req.body);
                if (cleaning.status && cleaning.id) {
                    let result = await CleaningDAO.updateCleaning(cleaning);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao atualizar limpeza'
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

    async deleteCleaning(req, res) {
        try {
            let id = req.params.id;
            if (id) {
                let result = await CleaningDAO.deleteCleaning(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'message': 'Limpeza deletada com sucesso'
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
                    'message': "ID da limpeza não fornecido"
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

module.exports = CleaningController;
