const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/user"));
// get driver connection
const dbo = require("./db/db-handler");
 
app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connect(function (err) {
        if (err) console.error(err);
 
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
  console.log(`Server is running on port: ${port}`);
});

require('./routes/user.js')(app);
