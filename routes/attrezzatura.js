const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get("/attrezzatura", async (req, res) => {
    try {
        let attrezzatura = req.query["attrezzatura"];
        let prodotti = [];

        if (attrezzatura) {
            prodotti = await db.findProductsByName(attrezzatura);
        } else {
            prodotti = await db.getAllProducts();
        }

        res.render("attrezzatura", {
            authenticated: req.isAuthenticated(),
            title: "Attrezzatura",
            prodotti: prodotti
        });
    } catch (error) {
        console.error('Errore durante il recupero dei prodotti:', error);
        res.status(500).send('Errore durante il recupero dei prodotti.');
    }
});


module.exports = router;
