import express from 'express';
import multer from 'multer';
import PostModel from '../models/PostModel.js';
import path from 'path';
import { getHomePage,
  createPost,
  deletePost,
  getOnePost,
  updatePost, 
  getAllPost
} from '../controllers/homeController.js'
// import {getPosts,createPost} from '../controllers/posts.js'

const router = express.Router();

 const Storage = multer.diskStorage({
    destination:function (req, file, cb) {
      cb(null, './src/public/images')
    }
  ,
    filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname));
    }
  });
 
const upload = multer({ 
    storage: Storage 
})

const initWebRoute = (app) => {

  router.get('/', getHomePage);
  router.get('/getAllPost', getAllPost)

  router.post('/upload',upload.single('image') ,createPost)

  router.get('/delete/(:id)',upload.single('image'), deletePost)

  //Get by ID Method
  router.get('/getOne/(:id)', getOnePost)

//Update by ID Method
router.post('/update/(:id)', updatePost)

return app.use('/', router)
}


export default initWebRoute;