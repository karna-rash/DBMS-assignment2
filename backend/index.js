import express from 'express';
const app = express();
import Routes from './routes/index.js';
import cors from 'cors';


app.use(cors());
app.use(express.json());
app.listen(5000)
app.use('', Routes);