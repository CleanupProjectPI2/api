const express = require('express');
const ValidTokenController = require('../controllers/ValidTokenController');
const UserController = require('../controllers/UserController');
const AddressController = require('../controllers/AddressController');
const CleaningController = require('../controllers/CleaningController');
const FavController = require('../controllers/FavController');
const InfoCleaningController = require('../controllers/InfoCleaningController');
const ServiceEvaluationController = require('../controllers/ServiceEvaluationController');
const IAController = require('../controllers/IAController');


const router = express.Router();
const path = require('path');

const multer  = require('multer');
const ImageController = require('../controllers/ImageController');



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


router.post('/registerImage', upload.single('image'), ImageController.insertImage);
router.delete('/deleteImages', ValidTokenController.validToken, ImageController.deleteImage);

router.post('/insertAddress', ValidTokenController.validToken, AddressController.insertAddress);
router.get('/selectAddress', ValidTokenController.validToken, AddressController.selectAddress); 
router.put('/updateAddress', ValidTokenController.validToken, AddressController.updateAddress);
router.delete('/deleteAddress', ValidTokenController.validToken, AddressController.deleteAddress);



router.post('/insertCleaning', ValidTokenController.validToken, CleaningController.insertCleaning);
router.get('/selectCleaning', ValidTokenController.validToken, CleaningController.selectCleaning);
router.get('/selectCleaningByUser', ValidTokenController.validToken, CleaningController.selectCleaningByUser);
router.get('/selectCleaningByCleaner', ValidTokenController.validToken, CleaningController.selectCleaningByCleaner); 
router.put('/updateCleaning', ValidTokenController.validToken, CleaningController.updateCleaning);
router.delete('/deleteCleaning', ValidTokenController.validToken, CleaningController.deleteCleaning);


router.post('/insertFav', ValidTokenController.validToken, FavController.insertFav);
router.get('/selectFav', ValidTokenController.validToken, FavController.selectFav);
router.delete('/deleteFav', ValidTokenController.validToken, FavController.deleteFav);


router.post('/insertInfoCleaning', ValidTokenController.validToken, InfoCleaningController.insertInfoCleaning);
router.get('/selectInfoCleaning', ValidTokenController.validToken, InfoCleaningController.selectInfoCleaning); 
router.get('/selectInfoAllCleaner', ValidTokenController.validToken, InfoCleaningController.selectInfoAllCleaners); 
router.put('/updateInfoCleaning', ValidTokenController.validToken, InfoCleaningController.updateInfoCleaning);
router.delete('/deleteInfoCleaning', ValidTokenController.validToken, InfoCleaningController.deleteInfoCleaning);


router.post('/insertServiceEvaluation', ValidTokenController.validToken, ServiceEvaluationController.insertServiceEvaluation);
router.get('/selectServiceEvaluation', ValidTokenController.validToken, ServiceEvaluationController.selectServiceEvaluation); //por faxina
router.get('/selectServiceEvaluationByCleaner', ValidTokenController.validToken, ServiceEvaluationController.selectServiceEvaluationByCleaner); // por usuário cleaner
router.delete('/deleteServiceEvaluation', ValidTokenController.validToken, ServiceEvaluationController.deleteServiceEvaluation);

router.post('/ia', IAController.iaConversation);

module.exports = router;