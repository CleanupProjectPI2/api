const Utils = require("../util/Utils");
const InfoCleaningDAO = require("../database/DAO/InfoCleaningDAO");
const InfoCleaningModel = require("../model/InfoCleaningModel");

const InfoCleaningController = {
    async insertInfoCleaning(req, res) {
        try {
            if (req.body != [] && req.body != undefined ) {
                let infoCleaning = new InfoCleaningModel(req.body);
                console.log(infoCleaning);
                if (Utils.notEmpty(infoCleaning.id_cleaner) && Utils.notEmpty(infoCleaning.typeCleaning) && Utils.notEmpty(infoCleaning.initHourJob) && Utils.notEmpty(infoCleaning.endHourJob) && infoCleaning.cleanMaterial != undefined && Utils.notEmpty(infoCleaning.priceDay)) {
                    let result = await InfoCleaningDAO.insertInfoCleaning(infoCleaning);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao cadastrar informações de limpeza'
                        });
                    } else {
                        res.status(500).json({
                            'type': "E",
                            'message': 'Erro ao cadastrar informações de limpeza'
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
        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async selectInfoCleaning(req, res) {
        try {   
            if (req.query.id_cleaner) {
                let infoCleaning = new InfoCleaningModel(req.query);
                let result = await InfoCleaningDAO.selectInfoCleaning(infoCleaning);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Sucesso ao buscar informações de limpeza'
                    });
                } else {
                    res.status(400).json({
                        'type': "E",
                        'message': 'Informações de limpeza não encontradas'
                    });
                }
            } else {
                res.status(400).json({
                    'type': "E",
                    'message': "ID do profissional de limpeza não fornecido"
                });
            }
        } catch (e) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async updateInfoCleaning(req, res) {
        try {
            if (req.body != [] && req.body != undefined ) {
                let infoCleaning = new InfoCleaningModel(req.body);
                if (Utils.notEmpty(infoCleaning.id) && Utils.notEmpty(infoCleaning.typeCleaning) && Utils.notEmpty(infoCleaning.initHourJob) && Utils.notEmpty(infoCleaning.endHourJob) && infoCleaning.cleanMaterial != undefined && Utils.notEmpty(infoCleaning.priceDay)) {
                    let result = await InfoCleaningDAO.updateInfoCleaning(infoCleaning);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao atualizar informações de limpeza'
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
        } catch (e) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async deleteInfoCleaning(req, res) {
        try {
            if (req.query.id) {
                let infoCleaning = new InfoCleaningModel(req.query);
                let result = await InfoCleaningDAO.deleteInfoCleaning(infoCleaning);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'message': 'Sucesso ao deletar informações de limpeza'
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
                    'message': "ID não fornecido"
                });
            }
        } catch (e) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async selectInfoAllCleaners(req, res) {
        try {   
                let result = await InfoCleaningDAO.selectInfoAllCleaners();
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Sucesso ao buscar informações de limpeza'
                    });
                } else {
                    res.status(400).json({
                        'type': "E",
                        'message': 'Informações de limpeza não encontradas'
                    });
                }
        } catch (e) {
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    }
};






module.exports = InfoCleaningController;
