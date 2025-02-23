require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASS; 

const ValidTokenController = {
    validToken(req, res, next){
        const authHeader = req.headers['authorization'];
    
        if (!authHeader) {
            return res.status(401).json({ message: 'No credentials provided' });
        }
    
        
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
    
        
        
    
        if (username === USER && password === PASSWORD) {
            next();
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }  
};
module.exports = ValidTokenController;