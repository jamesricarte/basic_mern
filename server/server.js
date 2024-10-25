const express = require('express');
const Mongoclient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors( {origin: 'http://localhost:5173'} ));

const CONNECTION_STRING = "";
const DATABASENAME = "dbname";
let database;

app.listen(5038, () => {
    // Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    //     database = client.db(DATABASENAME);
    //     console.log("Mongo DB Connection Sucessfull");
    // })
    console.log("Server started at port 5038");
})

//vite and express version:
app.get('/api', (req, res) => {
    res.json({fruits: ['apple', 'banana', 'orange', 'lucas']})
})

//art of engineer version of mern backend:
app.get('/api/dbname/getDataV2', (req, res) => {
    database.collection('dbcollection').find({}).toArray((error, result) => {
             res.send(result);
        })
   })
   
   app.post('/api/dbname/addDataV2', (req, res) => {
    database.collection('dbcollection').count({}, (error, numOfDocs) => {
    database.collection('dbcollection').insertOne({
             id: (numOfDocs+1).toString(),
             description: req.body.addData
        })
   res.json('Added Successfully');
   })
   })
   
   app.delete('/api/dbname/deleteDataV2', (req, res) => {
        database.collection('dbcollection').deleteOne({
             id: req.query.id
        })
        res.json('Delete Successfully');
   })
   

//chatgpt version
app.post('/api/dbname/addData', (req, res) => {
    const { newData } = req.body;
    database.collection("db_collection").count({}, (error, numOfDocs) => {
        database.collection("db_collection").insertOne({
            id: (numOfDocs+1).toString(),
            description: newData
        })
        .then(result => res.json({ message: "Added Successfully"}))
        .catch(error => res.status(500).json({error: "Error adding data"}));
    })
})

app.get('/api/dbname/getData', (req, res) => {
    database.collection("db_collection").find({}).toArray((error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching data'});
        } else {
            res.json(result);
        }
    })
})

app.put('/api/dbname/updateData/:id', (req, res) => {
    const { id } = req.params;
    const { updateData } = req.body;

    database.collection("db_collection").updateOne(
        { id: id},
        { $set: { description: updateData}}
    ).then(result => res.json({ message: 'Updated Successfully'}))
    .catch(error => res.status(500).json({ error: 'Error updating data'}));
})

app.delete('/api/dbname/deleteData/:id', (req, res) => {
    const { id } = req.params;

    database.collection("db_collection").deleteOne( { id: id} )
    .then(result => res.json({ message: 'Deleted Successfully'}))
    .catch(error => res.status(500).json({ error: 'Error deleting data'}));
})