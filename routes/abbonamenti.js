const express = require('express');
const router = express.Router();

router.get("/abbonamenti", (req, res) => {
    res.render("abbonamenti");
});