const express = require('express');
const router = express.Router();
const multer = require('multer');

const { sequelize, video } = require('../models');

//controller for video uploading

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './thumbnails')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

var uploadpic = multer({ storage: storage }).single("thumbnail");

//.single("file"), for test

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err});
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    });
});

//end of video upload controller  



router.post("/uploadThumb", uploadpic, async(req, res) => {
    let info = {
        thumbnail: req.file.path,
        //title: req.file.filename, for test
    }

    try {
        const Video = await video.create(info);

        return res.json(Video);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;