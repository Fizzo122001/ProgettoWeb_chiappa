const express = require('express');
const DataBase = require("../models/db");
const db = new DataBase();
const router = express.Router();

router.get("/servizi", async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user.coach === 1) {
            res.render("servizi", {
                authenticated: req.isAuthenticated(),
                title: "Servizi",
                coach: req.user.coach
            });
        } else {
            res.redirect("/accedi?alert=nonautorizzato");
        }
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        res.status(500).send("Errore durante il recupero dell'utente.");
    }
});

module.exports = router;
