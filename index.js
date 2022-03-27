const express = require("express");
const app = express();
const search = require("youtube-search");
const fs = require("fs");
const ytdl = require("ytdl-core");
var path = require("path");
const port = process.env.PORT || 3000;

var public = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, resp) => {
  resp.sendFile(path.join(public, "home.html"));
});

app.get("/download", (req, resp) => {
  resp.sendFile(path.join(public, "download.html"));
});

app.post("/wait", (req, resp) => {
  const ytUrl = req.body.url;
  const ytSearch = req.body.search;
  var opts = {
    maxResults: 10,
    key: "AIzaSyBwtUnCajvaXag7G2_OrLnza087VrLL9oA",
  };
  if (ytSearch != "" || ytUrl != "") {
    search(ytSearch, opts, (err, results) => {
      if (err) return console.log(err);
      if (ytSearch != "") {
        var link = results[0]["link"];
        var title = results[0]["title"];
      } else {
        var link = ytUrl;
      }
      ytdl(link).pipe(fs.createWriteStream(`public/video.mp4`));
    });
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    var fucku = async () => {
      await sleep(15000);
      resp.redirect("/download");
    };
    fucku();
  } else {
    resp.send("bkl kuch to dal");
  }
});

app.listen(port, () => {
  console.log(`Hosted on ${port} port`);
});
