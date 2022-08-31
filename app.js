const express = require("express")
const ytdl = require("ytdl-core")
const path = require("path")
const fs = require("fs");
const deletefile = require("./utiles/deletefile")
const app = express()
const port = process.env.PORT || 3000;


var views = path.join(__dirname, "views");
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',((req,resp)=>{
    const xys = false;
    resp.render('home',{value : xys})
}))

app.post('/',(async(req,resp)=>{

    try{
        url = req.body.url
        const getInformation = await ytdl.getInfo(url,(info)=>{
            return info;
        })
    
        const title = getInformation.videoDetails.title
        
        ytdl(url)
        .pipe(fs.createWriteStream(`views/${title}.mp4`)).on('close', async() => {
            resp.download(path.join(views,`${title}.mp4`))
            await deletefile(title)
        });

       
    }
    catch{
        resp.send("Invalid")
    }
}))

app.listen(port, () => {
    console.log(`Hosted on ${port} port`);
  });
