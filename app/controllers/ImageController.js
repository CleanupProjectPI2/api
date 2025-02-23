const ImageDAO = require("../database/DAO/ImagesDAO");
const ImagesModel = require("../model/ImagesModel");

const ImageController = {
    async insertImage(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                if(req.file != undefined){
                    let imageModel = new ImagesModel(req.body);
                    imageModel.link = 'uploads/'+req.file.filename;
                    imageModel.id_cleaning = imageModel.id_cleaning == undefined ? null : imageModel.id_cleaning;
                    imageModel.id_user = imageModel.id_user == undefined ? null : imageModel.id_user; 
                    imageModel.profile = imageModel.profile == "true" || imageModel.profile === true ? true : false;
                    imageModel.after = imageModel.after == "true" || imageModel.after === true ? true : false;  
                    console.log(imageModel)
                    let intBD = await ImageDAO.insertImage(imageModel);
                    console.log(intBD);
                    if(intBD.result){
                        res.status(200).json({
                            'type': "S",                            
                            'message': 'Sucesso ao cadastrar imagem do produto',
                        });
                    }else{
                        res.status(500).json({ 
                            'type': "E",
                            'message': "Erro ao inserir imagem" 
                        }); 
                    }
                }else{
                    res.status(400).json({ 
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios" 
                    });
                }                             
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios" 
                });
            }
            
        }catch(e){
            console.log(e.message);
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }    

    },

    async deleteImage(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                        if(req.body.imagesDelete != null && req.body.imagesDelete != undefined ){
                            let imagesDeleteId = req.body.imagesDelete;
                            if(imagesDeleteId.length > 0){
                                for(var i = 0; i < imagesDeleteId.length; i++){
                                    console.log(imagesDeleteId[i].id);
                                    await ImageDAO.deleteImage(imagesDeleteId[i].id); 
                                }
                                
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao deletar as imagens do produto',
                                });
                            }else{
                                res.status(400).json({
                                    'type': "E",                            
                                    'message': 'Erro, lista vazia',
                                }); 
                            }
                        }else{
                            res.status(400).json({ 
                                'type': "E",
                                'message': "Campos obrigatórios estão vazios" 
                            });
                        }                             
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios" 
                });
            }
            
        }catch(e){
            console.log(e.message);
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }    

    },

};


module.exports = ImageController;