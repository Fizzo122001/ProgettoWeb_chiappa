const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get("/", async (req, res) => {
    try {
        let attrezzatura = req.query["attrezzatura"];
        let prodotti = [];

        if (attrezzatura) {
            prodotti = await db.findProductsByName(attrezzatura);
        } else {
            prodotti = await db.getAllProducts();
        }
        const Rolecoach = req.user && req.user.coach !== undefined ? req.user.coach : 0;
        res.render("attrezzatura", {
            authenticated: req.isAuthenticated(),
            title: "Attrezzatura",
            prodotti: prodotti,
            coach : Rolecoach
        });
    } catch (error) {
        console.error('Errore durante il recupero dei prodotti:', error);
        res.status(500).send('Errore durante il recupero dei prodotti.');
    }
});


module.exports = router;
