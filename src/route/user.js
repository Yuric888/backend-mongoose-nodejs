import express from 'express';
import { deleteUser, registerUser } from '../controllers/userController.js';
import UserModel from '../models/UserModel.js';
const router = express.Router();

const initWebUser = (app) => {
    //  ejs
    router.get('/', async(req, res) => {
        const dataUser = await UserModel.find()
        res.render('user.ejs',{
            dataUser: dataUser
        })
    })
    // delete User
    router.get('/delete/(:id)', deleteUser)
    
    //User REgistration Route
    router.post('/register-user', async (req, res) => {
        await registerUser(req.body, 'user', res);
    })

     //Admin REgistration Route
    router.post('/register-admin', async (req, res) => {
        await registerUser(req.body, 'admin', res);
    })

     //User Login Route
    router.post('/login-user', async (req, res) => {})

     //Admin Login Route
    router.post('/login-admin', async (req, res) => {})
    
     //Profile Route
    router.post('/profile', async (req, res) => {})

     //Admin Protected Route
    router.post('/admin-protected', async (req, res) => {})
    
     //User Protected Route
    router.post('/user-protected', async (req, res) => {})
    
//end register
    






    return app.use('/user', router)
}

export default initWebUser;