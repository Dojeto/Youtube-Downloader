const express = require("express");
const app = express();
const search = require("youtube-search");
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, resp) => {
  resp.render("home");
});

app.post("/download", (req, resp) => {
  const ytUrl = req.body.url;
  const ytSearch = req.body.search;
  var opts = {
    maxResults: 10,
    key: "AIzaSyBwtUnCajvaXag7G2_OrLnza087VrLL9oA",
  };
  if (ytSearch != "" || ytUrl != "") {
    search(ytSearch, opts, (err, results) => {
      if (err) return console.log(err);
      if ((ytSearch != "")) {
        var link = results[0]["link"];
        var title = results[0]["title"];
      } else {
        var link = ytUrl;
      }
      ytdl(link).pipe(fs.createWriteStream(`video.mp4`));
    });
    resp.render("download");
  } 
  else {
    resp.send("Bkl Kuch tho dal");
  }
});

app.listen(3000, () => {
  console.log("Hosted on 3000 port");
});
