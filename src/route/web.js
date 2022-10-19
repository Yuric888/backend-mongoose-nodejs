import express from 'express';
import multer from 'multer';
import PostModel from '../models/PostModel.js';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import dotenv  from 'dotenv'
import { getHomePage,
  createPost,
  deletePost,
  getOnePost,
  updatePost, 
  getAllPost
} from '../controllers/homeController.js'
// import {getPosts,createPost} from '../controllers/posts.js'

const router = express.Router();


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

 const Storage = multer.diskStorage({
    filename: function (req, file, cb) {
    cb(null,Date.now() + path.extname(file.originalname));
    }
  });
 
const upload = multer({ 
    storage: Storage 
})

const initWebRoute = (app) => {
  //product
  router.get('/', getHomePage);
  router.get('/getAllPost', getAllPost)

  router.post('/upload',upload.single('image') ,createPost)

  router.get('/delete/(:id)',upload.single('image'), deletePost)

  //Get by ID Method
  router.get('/getOne/(:id)', getOnePost)

  //Update by ID Method
  router.post('/update/(:id)',upload.single('image'), updatePost)
  // end product

return app.use('/', router)
}


export default initWebRoute;