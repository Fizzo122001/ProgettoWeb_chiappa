const express = require('express');
const router = express.Router();
const DataBase = require('../models/db');
const database = new DataBase();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated() || req.user?.coach === 1) {
        return res.redirect("/accedi");
    }

    try {
        const servizi = await database.getServizi();
        const coach = req.user.coach;
        const id_utente = req.user.id;
        const alert = req.query.alert || null; 
        return res.render('servizi_offerti', {
            authenticated: req.isAuthenticated(),
            title: 'Servizi Offerti',
            servizi,
            coach,
            id_utente,
            alert
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Errore nel recuperare i servizi offerti.');
    }
});


router.post('/prenotati', async (req, res) => {
    try {
        const { id_utente, id_servizio } = req.body;
        const prenotazioni = await database.controllaPrenotazione(id_utente, id_servizio);
        if (prenotazioni.length > 0) {
            return res.redirect('/servizi_offerti?alert=giaprenotato');
        }

        await database.posti_disponibili(id_servizio);
        await database.inserisciprenotazione(id_utente, id_servizio);
        return res.redirect('/servizi_offerti');
    } catch (error) {
        console.error('Errore durante la prenotazione:', error);
        return res.status(500).send('Errore durante la prenotazione.');
    }
});



router.post('/annulla', async (req, res) => {
    try {
        const {id_servizio, id_utente_annullato } = req.body;
        const prenotazioni = await database.controllaPrenotazione(id_utente_annullato, id_servizio);
        if (prenotazioni.length > 0) {

            await database.posti(id_servizio);
            await database.eliminaPrenotazioni(id_utente_annullato , id_servizio );
        }

        return res.redirect('/servizi_offerti');
    } catch (error) {
        console.error('Errore: annullamento non riuscito', error);
        return res.status(500).send('Errore: annullamento non riuscito');
    }
});


module.exports = router;
