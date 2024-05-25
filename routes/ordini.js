const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();


router.get('/ordine', async (req, res) => {
    try {
        const emailUtente = req.user.email;
        const products = await db.getOrdini(emailUtente);
    } catch (error) {
        console.error('Errore durante la ricerca degli ordini:', error);
        res.status(500).send('Errore durante la ricerca degli ordini.');
    }
});

module.exports = router;
