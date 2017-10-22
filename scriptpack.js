const fs = require('fs');
const {
  URL
} = require('url');

function buildQueue(src) {
  fs.stat(src, function(err, stats) {
    if (err) {
      //Check if error is related to file not existing
      if (err.code === 'ENOENT') {
        console.error("File " + src + " does not exist");
        return;
      }
      throw err;
    }
    fs.open(src, 'r', function(err, fd) {
      let buffer = new Buffer(stats.size);
      fs.read(fd, buffer, 0, buffer.length, null, function(err, bytesRead, buffer) {
        let data = buffer.toString("utf8").split('\n');
        let relevant = [];
        for (let i = 0; i < data.length-1; i++) {
          //Remove brackets and quotes to get the string
          relevant.push(data[i].match(new RegExp(/\(([^)]+)\)/))[1].replace(/\"/g, ""));
          console.log(relevant[i])
        }
        console.log(relevant);
        return relevant;
      });
    });
  });
}

buildQueue("library.js");
