require('dotenv').config();
const jwt = require('jsonwebtoken');
const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

const ValidTokenController = {
    validToken(req, res, next){
        next();
    }  
};
module.exports = ValidTokenController;