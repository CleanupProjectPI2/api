const ServiceEvaluationDAO = require("../database/DAO/ServiceEvaluationDAO");
const ServiceEvaluationModel = require("../model/ServiceEvaluationModel");

const ServiceEvaluationController = {
    async insertServiceEvaluation(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let evaluation = new ServiceEvaluationModel(req.body);
                if (evaluation.id_user && evaluation.id_cleaner && evaluation.id_cleaning && evaluation.coment && evaluation.qtyStar) {
                    let result = await ServiceEvaluationDAO.insertServiceEvaluation(evaluation);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao cadastrar avaliação de serviço'
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

    async selectServiceEvaluationByCleaner(req, res) {
        try {
            let id = req.query.id_cleaner;
            if (id) {
                let result = await ServiceEvaluationDAO.selectServiceEvaluationByCleaner(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Avaliação de serviço encontrada'
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
                    'message': "ID da avaliação não fornecido"
                });
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async selectServiceEvaluation(req, res) {
        try {
            let id = req.query.id_cleaning;
            if (id) {
                let result = await ServiceEvaluationDAO.selectServiceEvaluation(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Avaliação de serviço encontrada'
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
                    'message': "ID da avaliação não fornecido"
                });
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                'type': "E",
                'message': "Erro interno do servidor"
            });
        }
    },

    async deleteServiceEvaluation(req, res) {
        try {
            let id = req.query.id;
            if (id) {
                let result = await ServiceEvaluationDAO.deleteServiceEvaluation(id);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'message': 'Avaliação de serviço deletada com sucesso'
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
                    'message': "ID da avaliação não fornecido"
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

module.exports = ServiceEvaluationController;
