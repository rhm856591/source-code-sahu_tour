const express = require('express');
const app = express();
require('dotenv').config()


const mongoose = require('mongoose');
const contact = require('./models/Contact');
mongoose.connect(process.env.mongoURL).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Not connected to database error: ", err);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res) => {
    const data = new contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message
    });
    data.save().then(() => {
        console.log("Saved to database");
        res.redirect('/');
    }).catch((err) => {
        console.log("Not saved to database error: ", err);
    });
})

app.listen(3000, () => {
    console.log('Server started')
});