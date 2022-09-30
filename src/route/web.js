import express from 'express';
import multer from 'multer';
import PostModel from '../models/PostModel.js';
import path from 'path';
import { getHomePage,createPost,deletePost } from '../controllers/homeController.js'
// import {getPosts,createPost} from '../controllers/posts.js'

const router = express.Router();

 const Storage = multer.diskStorage({
    destination:function (req, file, cb) {
      cb(null, './src/public/images')
    }
  ,
    filename: function (req, file, cb) {
     console.log('file :>> ', file);
    cb(null,Date.now() + path.extname(file.originalname));
    }
  });
 
const upload = multer({ 
    storage: Storage 
})

const initWebRoute = (app) => {

 

    router.get('/', getHomePage);

    //Post Method
// router.post('/post',upload.single('image'), createPost);

router.post('/upload',upload.single('image') ,createPost)


//Get all Method
router.get('/delete/(:id)', deletePost)

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
return app.use('/', router)
}


export default initWebRoute;