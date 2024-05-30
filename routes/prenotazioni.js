const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get('/', async (req, res) => {
    if (!req.user || !req.user.coach) {
        return res.redirect("/accedi");
    }
    try {
        const Allprenotazioni = await db.getAllPrenotazioni(); 
        return res.render("prenotazioni", { authenticated: req.isAuthenticated(), title: 'Prenotazioni', coach: req.user, Allprenotazioni }); 
    } catch (error) {
        console.error('Errore durante la ricerca degli ordini:', error);
        return res.status(500).send('Errore durante la ricerca delle prenotazioni.');
    }
});

module.exports = router;
