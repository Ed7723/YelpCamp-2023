const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,validateCampground,isAuthor} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
var multer = require('multer');
const {storage} = require('../cloudinary');
var upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(upload.array('image'),(req,res)=>{
        console.log(req.body,req.file);
        res.send('Working');
    })
    //.post(isLoggedIn,validateCampground,catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));

router.get(`/:id/edit`,isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

module.exports = router;