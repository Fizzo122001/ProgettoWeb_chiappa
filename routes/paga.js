const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('my.db'); 

router.get("/paga", (req, res) => {
    if(!req.user){
        return res.redirect("/accedi");
    }
});

router.post('/paga', (req, res) => {
    const totale = req.body.totale;
    const email_utente = req.user.email;

    const sql = `INSERT INTO Ordini (email_utente, prezzo) VALUES (?, ?)`;
    db.run(sql, [email_utente, totale], function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, ordineId: this.lastID });
    });
});

module.exports = router;
