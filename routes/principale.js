const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("principale", {
        authenticated: req.isAuthenticated()
    });
});

module.exports = router;