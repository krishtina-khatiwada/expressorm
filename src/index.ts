import 'dotenv/config';

import express from 'express';
import taskrouter from './routes/routes';

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/task', taskrouter);




app.listen(3000);