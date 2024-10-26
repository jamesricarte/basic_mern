const express = require('express');
const cors = require('cors');
var Mongoclient = require('mongodb').MongoClient;

const app = express();
app.use(cors( {origin: 'http://localhost:5173'} ));
app.use(express.json());

const CONNECTION_STRING = "mongodb+srv://admin:jamesuhenyou123@cluster0.0p7jv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "dbname";
let database;

app.listen(5038, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
         database = client.db(DATABASENAME);
         console.log("Mongo db connection successful");
    })

    console.log('Server is running at port 5038');
})

//vite and express version:
// app.get('/api', (req, res) => {
//     res.json({fruits: ['apple', 'banana', 'orange', 'lucas']})
// })

//art of engineer version of mern backend:
// app.get('/api/dbname/getDataV2', (req, res) => {
//     database.collection('dbcollection').find({}).toArray((error, result) => {
//              res.send(result);
//         })
//    })
   
//    app.post('/api/dbname/addDataV2', (req, res) => {
//     database.collection('dbcollection').count({}, (error, numOfDocs) => {
//     database.collection('dbcollection').insertOne({
//              id: (numOfDocs+1).toString(),
//              description: req.body.addData
//         })
//    res.json('Added Successfully');
//    })
//    })
   
//    app.delete('/api/dbname/deleteDataV2', (req, res) => {
//         database.collection('dbcollection').deleteOne({
//              id: req.query.id
//         })
//         res.json('Delete Successfully');
//    })
   

//chatgpt version
app.post('/api/dbname/addData', (req, res) => {
    const { newData } = req.body;
    database.collection("dbcollection").count({}, (error, numOfDocs) => {
        database.collection("dbcollection").insertOne({
            id: (numOfDocs+1).toString(),
            description: newData
        })
        .then(result => res.json({ message: "Added Successfully"}))
        .catch(error => res.status(500).json({error: "Error adding data"}));
    })
})

app.get('/api/dbname/getData', (req, res) => {
    database.collection("dbcollection").find({}).toArray((error, result) => {
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

    database.collection("dbcollection").updateOne(
        { id: id},
        { $set: { description: updateData}}
    ).then(result => res.json({ message: 'Updated Successfully'}))
    .catch(error => res.status(500).json({ error: 'Error updating data'}));
})

app.delete('/api/dbname/deleteData/:id', (req, res) => {
    const { id } = req.params;

    database.collection("dbcollection").deleteOne( { id: id} )
    .then(result => res.json({ message: 'Deleted Successfully'}))
    .catch(error => res.status(500).json({ error: 'Error deleting data'}));
})