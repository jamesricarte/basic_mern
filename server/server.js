const express = require('express');
const Mongoclient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
    res.json({fruits: ["apple", "banana", "orange"]});
})

const CONNECTION_STRING = "";
const DATABASENAME = "dbname";
var database;

app.listen(5038, () => {
    // Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    //     database = client.db(DATABASENAME);
    //     console.log("Mongo DB Connection Sucessfull");
    // })
    console.log("Server started at port 8080");
})

app.get('/api/dbname/getData', (req, res) => {
    database.collection("db_collection").find({}).toArray((error, result) => {
        res.send(result);
    })
})

app.post('/api/dbname/addData', (req, res) => {
    database.collection("db_collection").count({}, (error, numOfDocs) => {
        database.collection("db_collection").insertOne({
            id: (numOfDocs+1).toString(),
            description: request.body.newData
        });

        res.json("Added Successfully");
    })
})

app.delete('/api/dbname/deleteData', (req, res) => {
    database.collection("db_collection").deleteOne({
        id: request.query.id
    })
    res.json("Delete Successfully");
})