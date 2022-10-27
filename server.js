import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import initWebRoute  from './src/route/web.js'
import mongoose from 'mongoose';

import configViewEngine from './src/configs/viewEngine.js';
import * as dotenv from 'dotenv';
import initWebUser from './src/route/user.js';
import initWebProduct from './src/route/products.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
//setup view engine
configViewEngine(app);
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, limit: '30mb'}));
// app.use()
app.set("trust proxy", 1);
app.use(cors());
app.use(cors({
      AllowCredentials: true,
    origin: [
    process.env.URL_REACT,
    'http://localhost:3000'
] }));
 app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
            res.header('Access-Control-Allow-Credentials', true);
            next();
        })
app.use(cookieParser())

//init webrouter

const CONFIG = {useNewUrlParser: true, useUnifiedTopology: true}


// app.use('/posts', posts);

mongoose.connect(process.env.URI, CONFIG);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('error database: ', error)
})

database.once('connected', () => {
    console.log('Databse Connected')
})
initWebRoute(app);
initWebUser(app);
initWebProduct(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}` );
})