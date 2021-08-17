const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) throw err;
    console.log('MongoDB connection established!')
});

app.use('/users', require('./routes/users'));
app.use('/logs', require('./routes/logs'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));