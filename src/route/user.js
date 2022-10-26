import express from 'express';
import { deleteUser, deleteWithAuthen, getAllUser, loginUser, registerUser, requestRefreshToken, userLogout } from '../controllers/userController.js';
import UserModel from '../models/UserModel.js';
import { authenToken, authenTokenAdmin } from '../controllers/auth.js';
const router = express.Router();

const initWebUser = (app) => {
    //  ejs
    router.get('/', async(req, res) => {
        const dataUser = await UserModel.find()
        res.render('user.ejs',{
            dataUser: dataUser
        })
    })
    router.get('/all', authenToken, getAllUser)
    
    router.delete("/(:id)", authenTokenAdmin, deleteWithAuthen)
    // delete User
    router.delete('/delete/(:id)', deleteUser)
    
    //User REgistration Route
    router.post('/register', async (req, res) => {
        await registerUser(req.body, res);
    })

     //User Login Route
    router.post('/login', async (req, res) => {
        await loginUser(req.body, res);
    })
    // Refresh tokens
    router.post('/refresh',requestRefreshToken);

    // Log out
    router.post("/logout",authenToken, userLogout)

    return app.use('/user', router)
}

export default initWebUser;