var express = require('express');
var path = require('path');
var port = process.env.PORT || 3300;
var host = process.env.BASE_URL || "http://localhost:3300";
var app = express();
var api = require('./routes/api');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect(
    "mongodb://localhost:27017/database",
    { useNewUrlParser: true },
    err =>{
        if(err) throw err.message;
        console.log('mongodb connection successfully');
    },
    );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/",express.static(path.join(__dirname, "public")));
app.use("/api/data", api);



app.listen(port, () => console.log(`listening at  ${port}`));

