import express from 'express';
import { getHomePage } from '../controllers/homeController.js'
// import {getPosts,createPost} from '../controllers/posts.js'
const router = express.Router();
const initWebRoute = (app) => {
    router.get('/', getHomePage);

    router.get('/about', (req, res) =>{
    res.send('Im Yuric')
})
return app.use('/', router)
}


export default initWebRoute;