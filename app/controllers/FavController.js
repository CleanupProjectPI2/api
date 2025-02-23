const FavDAO = require("../database/DAO/FavoriteDAO");
const FavModel = require("../model/FavModel");

const FavController = {
    async insertFav(req, res) {
        try {
            if (req.body != [] && req.body != undefined) {
                let fav = new FavModel(req.body);
                if (fav.id_user && fav.id_cleaner) {
                    let result = await FavDAO.insertFav(fav);
                    if (result.result) {
                        res.status(200).json({
                            'type': "S",
                            'message': 'Sucesso ao adicionar favorito'
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

    async selectFav(req, res) {
        try {
            let fav = new FavModel(req.query);
            if (fav.id_user) {
                let result = await FavDAO.selectFav(fav);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'data': result.data,
                        'message': 'Favoritos encontrados'
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

    async deleteFav(req, res) {
        try {
            let fav = new FavModel(req.query);
            if (fav.id) {
                let result = await FavDAO.deleteFav(fav);
                if (result.result) {
                    res.status(200).json({
                        'type': "S",
                        'message': 'Favorito removido com sucesso'
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
                    'message': "ID do favorito não fornecido"
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

module.exports = FavController;
