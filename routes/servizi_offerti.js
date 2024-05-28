const express = require('express');
const router = express.Router();
const DataBase = require('../models/db'); 
const database = new DataBase();

router.get('/', async (req, res) => {
 
    if (!req.isAuthenticated() || req.user?.coach===1) {
        return res.redirect("/accedi");
    }

    try {
        const servizi = await database.getServizi();
        const coach = req.user.coach;
        return res.render('servizi_offerti', { authenticated: req.isAuthenticated(), title: 'Servizi Offerti', servizi, coach });
    } catch (error) {
        console.error(error);
        res.status(500).send('Errore nel recuperare i servizi offerti.');
    }
});

router.post('/prenotati', async (req, res) => {
    try {
        const { nome } = req.body;
        await database.posti_disponibili(nome);
        return res.redirect('/servizi_offerti');
    } catch (error) {
        console.error('Errore durante l\'inserimento della recensione:', error);
        return res.status(500).send('Errore durante l\'inserimento della recensione.');
    }
});

module.exports = router;
