const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get("/accedi", (req, res) => {
    const { alert } = req.query;
    let message;
    if (alert === "nonautorizzato") {
        message = "Devi essere un coach per accedere a questa pagina.";
    } else {
        message = alert ? "Autenticati per accedere al carrello." : null;
    }
    res.render("accedi", { message, title: "Accedi"});
});

router.post("/accedi", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Errore durante l'autenticazione:", err);
            return next(err);
        }
        if (!user) {
            console.log("Autenticazione fallita:", info.message);
            return res.status(401).send(info.message);
        }
        req.login(user, (err) => {
            if (err) {
                console.error("Errore durante il login:", err);
                return next(err);
            }
            console.log("Login avvenuto con successo:", user.email);
            return res.redirect("/");
        });
    })(req, res, next);
});

module.exports = router;