import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import initWebRoute  from './src/route/web.js'
import mongoose from 'mongoose';

import configViewEngine from './src/configs/viewEngine.js';
import * as dotenv from 'dotenv';
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
app.use(cors());
app.use(cors({origin: process.env.URL_REACT }));

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}` );
})