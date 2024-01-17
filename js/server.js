const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const router = require('./router');
const ejs = require('ejs');
const path = require('path');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.set('views', path.join(__dirname, '..', 'static'));
app.set('view engine', 'ejs');


app.use('/', router);

app.listen(port, () => {
    console.log(`сервер успешно создан: http://localhost:3000`);
})