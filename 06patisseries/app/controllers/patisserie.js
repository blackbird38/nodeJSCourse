const Patisserie = require('../models/patisserie');

const addPatisserie = (req, res) => { // e.g   POST http://localhost:5000/api/patisseries/
    const patisserie = new Patisserie(req.body);
    patisserie.save((err, addedPatisserie) => {
        if (err) throw err;
       res.redirect('/api/patisseries');
    });
};

const getPatisseries = (req, res) => { // e.g   GET http://localhost:5000/api/patisseries/
    Patisserie.find({}, (err, patisseries) => {
        if (err) throw err; 
        res.render('patisseries', {patisseries: patisseries} );
    });
};

const displayPatisserieForm = (req, res) => { // e.g GET http://localhost:5000/api/patisseries/form
        res.render('form');
};

const getPatisserie = (req, res) => { // e.g   GET http://localhost:5000/api/patisseries/5ed65bc7d5819f04acd37fff
    Patisserie.findById(req.params.patisserieId, (err, patisserie) => {
        if (err) throw err;
        res.render('patisserie', {patisserie: patisserie});
    });
};
const editPatisserie = (req, res) => {
    Patisserie.findById(req.params.patisserieId, (err, patisserie) => {
        if(err) throw (err);
        res.render('edit', {patisserie: patisserie});
    });
   
}
const updatePatisserie = (req, res) => { // e.g   PUT http://localhost:5000/api/patisseries/5ed65bc7d5819f04acd37fff
    Patisserie.findById(req.params.patisserieId, (err, patisserie) => {
        if(err) throw (err);
        Object.assign(patisserie, req.body).save((err, updatedPatisserie) => {
            if(err) throw (err);
            res.redirect('/api/patisseries');
            });
        });

};

const deletePatisserie = (req, res) => { // e.g insomnia DELETE http://localhost:5000/api/patisseries/5ed65bc7d5819f04acd37fff
    const query = {_id: req.params.patisserieId};
    Patisserie.deleteOne(query, (err, res2) => {
        if (err) throw err;
        if (res2.n > 0){
             // res.json({message: 'successfuly deleted.'});
             res.redirect('/api/patisseries');
        }else {
            res.json({message: 'Patisserie could not be deleted.'});
        }
    } );
};

module.exports = {
    addPatisserie,
    getPatisseries,
    getPatisserie, 
    updatePatisserie, 
    deletePatisserie,
    displayPatisserieForm,
    editPatisserie
}