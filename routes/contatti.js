const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const Rolecoach = req.user && req.user.coach !== undefined ? req.user.coach : 0;
    res.render("contatti", {
        authenticated: req.isAuthenticated(),
        title: "Contatti",
        coach : Rolecoach
    });
});

module.exports = router;