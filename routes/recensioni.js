const express = require('express');
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();


router.get("/", async (req, res) => {
    try {
        const Getrecensioni = await db.getRecensioni();
        const id_utente = req.user && req.user.id !== undefined ? req.user.id : null;
        const Rolecoach = req.user && req.user.coach !== undefined ? req.user.coach : 0;
        res.render("recensioni", { authenticated: req.isAuthenticated(), title: "recensioni", Getrecensioni , coach : Rolecoach , id_utente});
    } catch (error) {
        console.error('Errore durante il recupero delle recensioni:', error);
        res.status(500).send('Errore durante il recupero delle recensioni.');
    }
});

router.post('/inserisci_recensione', async (req, res) => {
    try {
        const { id_utente, testoRecensione } = req.body;
        await db.recensioni(id_utente, testoRecensione);
        return res.redirect('/recensioni');
    } catch (error) {
        console.error('Errore durante l\'inserimento della recensione:', error);
        return res.status(500).send('Errore durante l\'inserimento della recensione.');
    }
});

module.exports = router;
