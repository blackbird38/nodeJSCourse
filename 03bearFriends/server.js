const express = require('express');
const app = express();
const Bear = require('./app/models/bear');

const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bearfriends_db', { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', () => {
    console.log('MongoDB connected...');
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const router = express.Router();


router.use((req, res, next)=>{
    console.log('Router up');
    next();
});

router.get('/', (req, res) => {
    res.json({message : 'All working.'});
});

router.route('/bears')
    .post((req, res) => { // e.g insomnia POST http://localhost:5000/api/bears/
        const bear = new Bear(req.body);
        bear.save((err, bear) => {
            if (err) throw err;
            res.json({message : 'A new bear was added.' + bear});
        });
    })
    .get((req, res) => { // // e.g insomnia GET http://localhost:5000/api/bears/
        Bear.find({}, (err, bears) => {
            if (err) throw err;
            res.json(bears);
        });
    })
router.route('/bears/:bearId')
    .get((req, res) => { // e.g insomnia GET http://localhost:5000/api/bears/5ed65bc7d5819f04acd37fff
        Bear.findById(req.params.bearId, (err, bear) => {
            if (err) throw err;
            res.json(bear);
        });
    })
    .put((req, res) => { // e.g insomnia PUT http://localhost:5000/api/bears/5ed65bc7d5819f04acd37fff
    /*  const query = {_id: req.params.bearId};
        const newBear = {$set: {_id: req.params.bearId, name: req.body.name}};
        Bear.updateOne(query, newBear, (err, res2) => {
            if (err) throw err;
            console.log(res2);
            if (res2.n > 0){
                res.json({message: 'Bear successfuly updated: ' + req.body.name});
            }else {
                res.json({message: 'Bear could not be updated.'});
            }
        });*/

        Bear.findById(req.params.bearId, (err, bear) => {
            if(err) throw (err);
            const oldBearName = bear.name;
            Object.assign(bear, req.body).save((err, updatedBear) => {
                if(err) throw (err);
                res.json({ message: `Bear ${oldBearName} successfuly updated.`, updatedBear });
                });
            });

    })
    .delete((req, res) => { // e.g insomnia DELETE http://localhost:5000/api/bears/5ed65bc7d5819f04acd37fff
        const query = {_id: req.params.bearId};
        Bear.deleteOne(query, (err, res2) => {
            if (err) throw err;
            console.log(res2);
            if (res2.n > 0){
                res.json({message: 'Bear successfuly deleted.'});
            }else {
                res.json({message: 'Bear could not be deleted.'});
            }
        } );
    });

app.use('/api', router);

app.listen(port, ()=> {
    console.log('The server is listening at the port ', port);
});