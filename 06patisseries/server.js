const express = require('express');
const app = express();
let patisserieController = require('./app/controllers/patisserie');

const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/patisseries_db', { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', () => {
    console.log('MongoDB connected...');
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', './app/views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get ('/', (req, res) => {
    res.render('test', {message: 'Welcome here'})
})
const router = express.Router();


router.use((req, res, next)=>{
    console.log('Router up');
    next();
});

router.get('/', (req, res) => {
    res.json({message : 'All working.'});
});

router.route('/patisseries')
    .get(patisserieController.getPatisseries);
router.route('/patisseries/add')
    .get(patisserieController.displayPatisserieForm)    
    .post(patisserieController.addPatisserie);
router.route('/patisseries/:patisserieId')
    .get(patisserieController.getPatisserie)
    .post(patisserieController.updatePatisserie);

router.route('/patisseries/:patisserieId/edit')
    .get(patisserieController.editPatisserie);
router.route('/patisseries/:patisserieId/delete')    
    .get(patisserieController.deletePatisserie);

app.use('/api', router);

app.listen(port, ()=> {
    console.log('The server is listening at the port ', port);
});