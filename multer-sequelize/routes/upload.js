const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { sequelize, video } = require('../models');

//controller for video uploading

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file");

//.single("file"), for test

router.post("/uploadfiles", async (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err});
        }
        console.log(res.req.file.path);
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })

        // let filePath = "";

        // console.log(filePath);
        // return res.json({ success: true, filePath: filePath, fileName: res.req.file.filename })

    });
});

//end of video upload controller 

router.post("/uploadVideo", upload, async(req, res) => {
    // let info = {
    //     title: req.body.title,
    // filePath: res.req.file.path
    //     description: req.body.description,
    //     thumbnail: req.file.path,
        //title: req.file.filename, for test
    // }

    try {
        const Video = await video.create(req.body);

        return res.json(Video);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Path for thumbnail generation
router.post("/thumbnail", (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";

    // req.body.filepath
    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log('metadata is taken.');
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath) //req.body.filepath
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames);
        thumbsFilePath = "./uploads/thumbnails/" + filenames[0];
        
    })
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
    })
    .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 3,
        folder: './uploads/thumbnails',
        size:'320x240',
        // %b input basename ( filename w/o extension )
        filename:'thumbnail-%b.png'
    });
})



router.get("/allVideos", async(req, res) => {
    try {
    let Videos = await video.findAll({}); //{}
    res.status(200).send(Videos);
    } catch (err) {
        console.log(err);
        return res.status.apply(500).json(err);
    }
});

//works for test through postman
// router.get("/getVideo/:id", async (req, res) => {
//     const id = req.params.id;

//     try {
//         const getvideo = await video.findOne({
//             where: { id },
//         })

//         return res.json(getvideo)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// })

router.get("/getVideo/:videoId", async (req, res) => {
    let id = req.params.videoId
    // let id = req.body.videoId
    // let id = "id"

        try {
            const getvideo = await video.findOne({
                //  "id" : req.body.videoId 
                where: { id: id }
            })
    
            // return res.status(200).send(getvideo);
            return res.json(getvideo)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' });
        }
    })

// router.post("/getVideo/:videoId", async (req, res) => {
//      const id = req.params.videoId

//     try {
//         const getvideo = await video.findOne({
//             where : { id: id }})

//         return res.status(200).send(getvideo)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// })

module.exports = router;