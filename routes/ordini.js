const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get('/ordini', async (req, res) => {
    if (!req.user)
        return res.redirect("/accedi");
    try {
        const emailUtente = req.user.email;
        const ordini = await db.getOrdini(emailUtente); 
        res.render("ordini", { authenticated: req.isAuthenticated(), title: 'Ordini', coach: req.user, ordini: ordini }); // Passa gli ordini al template
    } catch (error) {
        console.error('Errore durante la ricerca degli ordini:', error);
        res.status(500).send('Errore durante la ricerca degli ordini.');
    }
});

module.exports = router;
