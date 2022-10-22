import express from 'express';
import dotenv  from 'dotenv'
import { createProductUser, getAllProducts } from '../controllers/productsController.js';

const router = express.Router();

dotenv.config();

const initWebProduct= (app) => {
  //product
    router.get('/',getAllProducts);

    router.post('/post', createProductUser)

return app.use('/user/product', router)
}


export default initWebProduct;