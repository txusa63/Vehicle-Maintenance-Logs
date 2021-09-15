const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:3000'], credentials: true}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) {
        return console.error(err);
    };
    console.log('MongoDB connection established!')
});

app.use('/users', require('./routes/users'));
app.use('/logs', require('./routes/logs'));
// app.use('/admin', require('./routes/admin'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));