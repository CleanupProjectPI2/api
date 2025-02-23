const Utils = require("../util/Utils");
const UserDAO = require("../database/DAO/UserDao");
const UserModel = require("../model/UserModel");
const AddressDAO = require("../database/DAO/AddressDAO");

const UserController = {
    async insertUserControll(req, res) {
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                if(Utils.notEmpty(user.name) && Utils.notEmpty(user.email) && Utils.notEmpty(user.password)){
                    let existUser = await UserDAO.selectUser(user);
                    if(existUser.result){
                        if(existUser.data.length == 0){
                            let intBD = await UserDAO.insertUser(user);
                            if(intBD.result){
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao cadastrar usuário'
                                });
                            }else{
                                res.status(500).json({
                                    'type': "E",                            
                                    'message': 'Erro ao cadastrar usuário'
                                });
                            }
                              
                        }else{
                            res.status(400).json({
                                'type': "E",                            
                                'message': 'usuário já cadastrado'
                            });
                        }
                    }else{
                        res.status(500).json({
                            'type': "E",                            
                            'message': 'Erro interagir com o banco'
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
    
    async login (req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                if(Utils.notEmpty(user.password) && Utils.notEmpty(user.email)){
                    let userDB = await UserDAO.selectUser(user);
                    if(userDB.result){
                        if(userDB.data.length >= 1){
                            let address = await AddressDAO.selectAddress(userDB.data[0].id);
                            var userData = {
                                id: userDB.data[0].id,
                                name: userDB.data[0].name,
                                email:userDB.data[0].email,
                                tell: userDB.data[0].tell,
                                rooms: userDB.data[0].rooms,
                                about:userDB.data[0].about,
                                address: address.result ? address.data : [] 
                            }
    
    
                            res.status(200).json({
                                'type': "S", 
                                'data': userData,                           
                                'message': 'Sucesso ao efetuar login'
                            });
                        }else{
                            res.status(400).json({
                                'data': [],
                                'type': "E",                         
                                'message': 'Usuário não encontrado, verifique se sua senha e email estão corretos.'
                            });
                        }
                    }else{
                        res.status(400).json({
                            'data': [],
                            'type': "E",                         
                            'message': 'Usuário não encontrado, verifique se sua senha e email estão corretos.'
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
            
        }catch(error){
            console.log(error.message);
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
        
    },

    async deleteUser(req, res){
        try{
            let user = new UserModel({id:req.query.id});
            if(Utils.notEmpty(user.id)){
                let intBD = await UserDAO.deleteUser(user);
                if(intBD.result){
                    res.status(200).json({
                        'type': "S",                            
                        'message': 'Sucesso ao deletar cliente'
                    });
                }else{
                    res.status(500).json({
                        'type': "E",                            
                        'message': intBD.message
                    });
                }       
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Id do usuário não encontrado na requisição" 
                });  
            }
        }catch(e){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },

    async updateUser(req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                if(Utils.notEmpty(user.id) && Utils.notEmpty(user.name) && Utils.notEmpty(user.email) && Utils.notEmpty(user.password)){
                            let intBD = await UserDAO.updateUser(user);
                            if(intBD.result){
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao atualizar usuário'
                                });
                            }else{
                                res.status(500).json({
                                    'type': "E",                            
                                    'message': intBD.message
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
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },







};
  
module.exports = UserController;