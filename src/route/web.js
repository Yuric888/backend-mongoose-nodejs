import express from 'express';
import { getHomePage,createPost,deletePost } from '../controllers/homeController.js'
// import {getPosts,createPost} from '../controllers/posts.js'
const router = express.Router();
const initWebRoute = (app) => {
    router.get('/', getHomePage);

    //Post Method
router.post('/post', createPost);

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