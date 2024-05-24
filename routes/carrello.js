const express = require('express');
const router = express.Router();


router.get("/carrello", (req, res) => {
    const { alert } = req.query;
    

    if (req.isAuthenticated()) {
        res.render("carrello", {
            authenticated: req.isAuthenticated(),
            title: "Carrello",
            prodotti : prodotti
        });
    } else {
        let message;
        if (alert === "nonautorizzato") {
            message = "Autenticati per accedere al carrello";
            res.render("accedi", { message, title: "Accedi" });
        } else {
            res.redirect("/carrello?alert=nonautorizzato");
        }
    }
});

module.exports = router;
