const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

router.post("/postmusic", async (req, res)=>{
    try{
        const youtubeVideoLink = req.body.songName;
        const videoInfo = await ytdl.getInfo(youtubeVideoLink);
        const videoTitle = videoInfo.videoDetails.title;

        const filePath = path.join(__dirname, "../public/music", `${videoTitle}.mp3`);
        let videoLink = `../music/${videoTitle}.mp3`;

        ytdl.downloadFromInfo(videoInfo, {filter: "audioonly"}).pipe(fs.createWriteStream(filePath));

        res.render("download", {
            videoTitle: videoTitle,
            videoLink: videoLink
        })
    
    }catch(err){
        console.log("Dönüştürme sırasında bir hata oluştu!", err);
        res.status(500)
        res.send("Dönüştürme sırasında bir hata oluştu.");
    }
})


module.exports = router;