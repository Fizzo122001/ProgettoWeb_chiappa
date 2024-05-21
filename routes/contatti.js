const express = require('express');
const router = express.Router();

router.get("/contatti", (req, res) => {
    res.render("contatti");
});