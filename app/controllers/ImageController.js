const ImageController = {
    async insertImage(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                if(req.file != undefined){
                    let imageModel = new ImagesModel(req.body);
                    imageModel.link = 'uploads/'+req.file.filename;
                    let intBD = await ImageDAO.insertImageProduct(imageModel);
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
                                    console.log(imagesDeleteId[i]);
                                    await ImageDAO.deleteImageProduct(imagesDeleteId[i]); 
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