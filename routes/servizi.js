const express = require('express');
const router = express.Router();

router.get("/servizi", (req, res) => {
    if (req.isAuthenticated() && req.user.ruolo === "coach") {
        res.render("servizi", {
            authenticated: req.isAuthenticated(),
            title: "Servizi"
        });
    } else {
        res.redirect("/accedi?alert=nonautorizzato");
    }
});

module.exports = router;