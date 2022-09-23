import express from 'express';
import bodyParse from 'body-parser';
import cors from 'cors';
import posts from './routes/posts.js';
import mongoose from 'mongoose';
import path from 'path';
import configViewEngine from './src/configs/viewEngine.js';
import * as dotenv from 'dotenv';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
configViewEngine(app);
const URI = 'mongodb+srv://admin:IRNEct9VM7bMMcrF@cluster0.dgsqnnf.mongodb.net/yuric?retryWrites=true&w=majority';

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

// app.use('/posts', posts);

// mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() =>{
//      console.log('Connected to DB');
//     app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })
   
// }).catch((err) =>{
//     console.log('err ', err)
// })

app.get('/', (req, res) =>{
    res.render('index.ejs')
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})