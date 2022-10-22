import express from 'express';
import { deleteUser, loginUser, registerUser } from '../controllers/userController.js';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
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
    router.post('/login-user', async (req, res) => {
        await loginUser(req.body, 'user', res);
    })

     //Admin Login Route
    router.post('/login-admin', async (req, res) => {
        await loginUser(req.body, 'admin', res);
    })

    return app.use('/user', router)
}

export default initWebUser;