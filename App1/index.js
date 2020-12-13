const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to App1!" });
  });
  
  // Create a new Note
  app.post('/details',  (req, res) => {
    // Validate request
    console.log(req.body)
    data = JSON.parse(req.body)
    if(!data) {
        return res.status(400).send({
            message: "Details can not be empty"
        });
    }

    const Details = require('./models/schema.model.js');
    // Create
    const details = new Details({
        name: data.name, 
        email: data.email,
        phone: data.phone,
        address: data.address
    });

    // Save details in the database
    details.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the details."
        });
    });
});

  // Retrieve all Details
  app.get('/details', (req, res) => {
    const Details = require('./models/schema.model.js');
    Details.find()
    .then(det => {
        res.send(det);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving details."
        });
    });
});

  app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
  });