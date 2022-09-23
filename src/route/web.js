import express from 'express';
// import {getPosts,createPost} from '../controllers/posts.js'
const router = express.Router();
const initWebRoute = (app) => {
    router.get('/', (req, res) =>{
    res.render('index.ejs')
})
router.get('/about', (req, res) =>{
    res.send('Im Yuric')
})
return app.use('/', router)
}


export default initWebRoute;