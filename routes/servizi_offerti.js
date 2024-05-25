const express = require('express');
const router = express.Router();
const DataBase = require('../models/db'); 
const database = new DataBase();


router.get('/servizi_offerti', async (req, res) => {
  
    try {
        const servizi = await database.getServizi();
        res.render('servizi_offerti', { authenticated: req.isAuthenticated(), title: 'Servizi Offerti', coach: req.user, servizi: servizi });
    } catch (error) {
        console.error(error);
        res.status(500).send('Errore nel recuperare i servizi offerti.');
    }
});

module.exports = router;
