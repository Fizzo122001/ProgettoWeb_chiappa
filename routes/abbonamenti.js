const express = require('express');
const router = express.Router();

router.get("/abbonamenti", (req, res) => {
    const Rolecoach = req.user && req.user.coach !== undefined ? req.user.coach : 0;

    res.render("abbonamenti", {
        authenticated: req.isAuthenticated(),
        title: "Abbonamenti",
        coach: Rolecoach
    });
});

module.exports = router;
