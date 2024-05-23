const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get("/attrezzatura", async (req, res) => {
    let attrezzatura, prodotti;

    try {
        attrezzatura = req.query["attrezzatura"];

        if(attrezzatura)
            prodotti = await db.findProductsByName(attrezzatura);

    } catch (error) {
        console.log("Errore: " + error);
    }

    res.render("attrezzatura", {
        authenticated: req.isAuthenticated(),
        title: "Attrezzatura",
        prodotti: prodotti
    });
});

module.exports = router;