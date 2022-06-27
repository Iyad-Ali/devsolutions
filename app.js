const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorCont = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes.routes);
app.use(publicRoutes);

app.use(errorCont.getError404);

mongoose.connect('mongodb+srv://DevSolutions:8ttM5kVi6BqOe2ol@cluster0.8t7rw.mongodb.net/?retryWrites=true&w=majority')
.then(result=> {app.listen(8000);})
.catch(err=>{console.log(err);});