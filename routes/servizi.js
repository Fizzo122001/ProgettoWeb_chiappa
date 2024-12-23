const express = require('express');
const DataBase = require("../models/db");
const db = new DataBase();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if (req.user.coach === 1) {
            const servizi = await db.getServizi();
            return res.render("servizi", {
                authenticated: req.isAuthenticated(),
                title: "Servizi",
                coach: req.user.coach,
                servizi: servizi
            });
        } else {
            return res.redirect("/accedi?alert=nonautorizzato");
        }
    } catch (error) {
        console.error("Errore durante il recupero dei servizi:", error);
        res.status(500).send("Errore durante il recupero dei servizi.");
    }
});

router.get('/offri_servizio', async (req, res) => {
    if (!req.user || !req.user.coach)
        return res.redirect("/accedi");
});

router.get('/elimina_servizio', async (req, res) => {
    if (!req.user || !req.user.coach)
        return res.redirect("/accedi");
});

router.get('/modifica', async (req, res) => {
    if (!req.user || !req.user.coach)
        return res.redirect("/accedi");
});

router.post("/offri_servizio", async (req, res) => {
    try {
        const { nome, descrizione, immagine , posti_disponibili} = req.body;
        await db.offriServizio(nome, descrizione, immagine, posti_disponibili);
        res.redirect("/servizi");
    } catch (error) {
        console.error("Errore durante l'offerta del servizio:", error);
        res.status(500).send("Errore durante l'offerta del servizio.");
    }
});

router.post("/elimina_servizio", async (req, res) => {
    try {
        const { ID_servizio } = req.body;
        await db.eliminaServizio(ID_servizio);
        res.redirect("/servizi");
    } catch (error) {
        console.error("Errore durante l'eliminazione del servizio:", error);
        res.status(500).send("Errore durante l'eliminazione del servizio.");
    }
});

router.post("/modifica", async (req, res) => {
    try {
        const { ID_servizio , nome_modifica, nuova_descrizione, nuova_immagine } = req.body;
        await db.modificaServizio(ID_servizio,nome_modifica, nuova_descrizione, nuova_immagine);
        return res.redirect("/servizi");
    } catch (error) {
        console.error("Errore durante l'eliminazione del servizio:", error);
        return res.status(500).send("Errore durante l'eliminazione del servizio.");
    }
});


router.get("/servizi_offerti", async (req, res) => {
    try {
        const servizi = await db.getServizi();
        res.render("servizi_offerti", {
            authenticated: req.isAuthenticated(),
            title: "Servizi Offerti",
            servizi: servizi
        });
    } catch (error) {
        console.error("Errore durante il recupero dei servizi offerti:", error);
        res.status(500).send("Errore durante il recupero dei servizi offerti.");
    }
});

module.exports = router;
