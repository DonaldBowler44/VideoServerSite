require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const ffmpeg = require("fluent-ffmpeg");

const { sequelize, video } = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/api/upload', require('./routes/upload'));
app.use('/api/uploadpic/', require('./routes/uploadthumbnail'));

// ffmpeg.setFfmpegPath("C:\PATH_Programs\ffmpeg.exe");

// ffmpeg.setFfprobePath("C:\PATH_Programs\ffprobe.exe");


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('./uploads'));

app.listen({ port: 5000}, async () => {
    console.log('Server up on http://localhost:5000');

    //create new tables with sync, not auth
    // await sequelize.sync({ force: true })
    await sequelize.sync({ alter: true })

    //auth allows use of premade tables
    // await sequelize.authenticate()
    console.log('Database Synced!');
})