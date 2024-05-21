const express = require('express');
const router = express.Router();

router.get("/registrazione", (req, res) => {
    if (!res.locals.loggedin) {
        res.render("accedi");
    }
    res.render("registrazione");
});

router.post("/registrazione", async (req, res) => {
    const { email, password, birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlInsertUtente = "INSERT INTO utente (email, password, data_nascita) VALUES (?, ?, ?)";

    db.run(sqlInsertUtente, [email, hashedPassword, birthdate], function (err) {
        if (err) {
            console.error("Errore durante l'inserimento dell'utente:", err.message);
            res.render("registrazione", { message: "Si è verificato un errore durante la registrazione. Riprova." });
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;