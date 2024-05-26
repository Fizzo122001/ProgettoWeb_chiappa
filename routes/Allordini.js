const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get('/allordini', async (req, res) => {
    if (!req.user || !req.user.coach) {
        return res.redirect("/accedi");
    }
    try {
        const Allordini = await db.getAllOrdini(); 
        return res.render("allordini", { authenticated: req.isAuthenticated(), title: 'Ordini', coach: req.user, Allordini : Allordini }); 
    } catch (error) {
        console.error('Errore durante la ricerca degli ordini:', error);
        return res.status(500).send('Errore durante la ricerca degli ordini.');
    }
});

module.exports = router;
