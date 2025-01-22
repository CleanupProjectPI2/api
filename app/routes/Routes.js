const express = require('express');
const ValidTokenController = require('../controllers/ValidTokenController');
const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();
const path = require('path');

const multer  = require('multer');
const ProductController = require('../controllers/ImageController');



const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./app/public/uploads/");
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
    
});

const fileFilterObject = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png" || file.mimetype === "image/svg" || file.mimetype === "image/webp" ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilterObject
});

router.post('/registerUser', UserController.insertUserControll);
router.post('/login', UserController.login); 
router.put('/updateUser', ValidTokenController.validToken, UserController.updateUser);
router.delete('/deleteUser', ValidTokenController.validToken, UserController.deleteUser);

router.post('/registerCategory', ValidTokenController.validToken, CategoryController.insertCategoryControll);
router.get('/selectCategory', CategoryController.selectAllCategory);
router.get('/selectCategoryById', CategoryController.selectOneCategory); 
router.put('/updateCategory', ValidTokenController.validToken, CategoryController.updateCategory);
router.delete('/deleteCategory', ValidTokenController.validToken, CategoryController.deleteCategory);

router.post('/registerImage', upload.single('image'), ProductController.insertImageProduct);
router.delete('/deleteImagesProduct', ValidTokenController.validToken, ProductController.deleteImageProduct);





module.exports = router;