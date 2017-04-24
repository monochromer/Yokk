import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './router';
import runMongoose from './mongoose';

dotenv.config();

const app = express();

runMongoose(app);

//middleware
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// setting static folder
app.use(express.static(path.join(__dirname, '/../build')));
app.use(express.static(path.join(__dirname, 'uploads')));

// router
router(app);

// app.set('port', (process.env.PORT || 5000));
app.set('port', 9000);
app.listen(app.get('port'), () => console.log(`App is listening on port ${app.get('port')}`));