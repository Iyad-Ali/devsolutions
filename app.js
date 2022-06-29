const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

const errorCont = require('./controllers/error');

const MONGODB_URI = 'mongodb+srv://DevSolutions:8ttM5kVi6BqOe2ol@cluster0.8t7rw.mongodb.net/';

const app = express();

const store = new mongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));

// app.use('/admin', adminRoutes.routes);
app.use(publicRoutes);

app.use(errorCont.getError404);

mongoose.connect(
    MONGODB_URI
).then(result => {
    console.log('Connected!');
    app.listen(process.env.PORT || 8000);
}).catch(err => {
    console.log(err);
});