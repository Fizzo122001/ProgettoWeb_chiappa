const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();


router.get("/", async (req, res) => {
    try {
        const Getrecensioni = await db.getRecensioni();
        const emailUtente = req.isAuthenticated() ? req.user.email : '';
        const Rolecoach = req.user && req.user.coach !== undefined ? req.user.coach : 0;
        res.render("recensioni", { authenticated: req.isAuthenticated(), title: "recensioni", Getrecensioni , coach : req.user.coach , emailUtente});
    } catch (error) {
        console.error('Errore durante il recupero delle recensioni:', error);
        res.status(500).send('Errore durante il recupero delle recensioni.');
    }
});

router.post('/inserisci_recensione', async (req, res) => {
    try {
        const { emailUtente, testoRecensione } = req.body;
        await db.recensioni(emailUtente, testoRecensione);
        return res.redirect('/recensioni');
    } catch (error) {
        console.error('Errore durante l\'inserimento della recensione:', error);
        return res.status(500).send('Errore durante l\'inserimento della recensione.');
    }
});

module.exports = router;
