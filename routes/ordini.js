const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get('/', async (req, res) => {
    if (!req.user)
        return res.redirect("/accedi");
    try {
        const idUtente = req.user.ID;
        const ordini = await db.getOrdini(idUtente); 
        res.render("ordini", { authenticated: req.isAuthenticated(), title: 'Ordini', coach: req.user, ordini: ordini }); 
    } catch (error) {
        console.error('Errore durante la ricerca degli ordini:', error);
        res.status(500).send('Errore durante la ricerca degli ordini.');
    }
});

module.exports = router;
