const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to App2!" });
  });
  
  const http = require('http');
  app.post('/testapp', function(req, res) {
    console.log(req.body)
    var request = http.request({
        host: 'localhost',
        port: 8080,
        path: '/details',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(req.body))
          },
        body: JSON.stringify(req.body)
      }, function(response) {
        var data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res.end('Received response from App1 to App2(Test App):' + data);
        });
      });
      request.end();
    });

  const PORT = 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });