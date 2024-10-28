const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crudRoutes = require('./routes/crud');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors( {origin: 'http://localhost:5173'} ));
app.use('/users', crudRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Mongodb Connection Successfull!');

    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    })
})
.catch((error) => {
    console.error(error);
})