const ImageController = {
    async insertImageProduct(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                if(req.file != undefined){
                        
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao cadastrar imagem do produto',
                                });
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

    async deleteImageProduct(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                let userToken = new UserModel(req.decoded);
                    if(userToken.adm == true){
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
                        res.status(405).json({ 
                            'type': "E",
                            'message': "Usuário sem permissão para realizar ação" 
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

}


module.exports = ImageController;