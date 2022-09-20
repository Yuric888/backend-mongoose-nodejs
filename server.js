import express from 'express';
import bodyParse from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true, limit: '30mb'}));
app.use('/', cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})