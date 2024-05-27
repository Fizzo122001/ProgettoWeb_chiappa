const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("principale", {
        authenticated: req.isAuthenticated(),
        title: "Home",
        coach: req.user ? req.user.coach : null,
    });
});

module.exports = router;