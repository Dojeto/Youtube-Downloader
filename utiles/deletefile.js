const fs = require("fs");
const path = require("path");

var views = path.join(__dirname, "../views");

module.exports = (title)=>{
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                fs.unlink(path.join(views,`${title}.mp4`),()=>{
                    console.log("deleted")
                })
            )
        }, 20000);
})
}
