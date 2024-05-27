const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();


router.get('/', async (req, res) => {
    try {
        const name = req.query.name.trim();
        const products = await db.findProductsByName(name);
    } catch (error) {
        console.error('Errore durante la ricerca dei prodotti:', error);
        res.status(500).send('Errore durante la ricerca dei prodotti.');
    }
});

module.exports = router;
