
const express = require('express');
const router = express.Router();

router.get('/servizi_offerti', (req, res) => {
    res.render('servizi_offerti', {
        authenticated: req.isAuthenticated(),
        title: 'Servizi Offerti',
        coach: 0
    });
});

module.exports = router;


module.exports = router;