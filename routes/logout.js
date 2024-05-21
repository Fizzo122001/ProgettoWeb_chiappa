const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Errore durante il logout:', err);
            return next(err);
        }
        res.redirect('/accedi');
    });
});

module.exports = router;