const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("principale");
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Errore durante il logout:", err);
            res.sendStatus(500);
        } else {
            res.redirect("/principale");
        }
    });
});
