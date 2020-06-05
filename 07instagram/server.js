const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const passportJWT = require('./middleware/passportJWT')();
const errorHandler = require('./middleware/errorHandler');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use(cors());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/instagram_db', { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passportJWT.initialize());

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log(`Server is listening at the port 3000...`);
});