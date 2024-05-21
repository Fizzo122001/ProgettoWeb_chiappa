const express = require('express');
const router = express.Router();

router.get("/attrezzatura", (req, res) => {
    res.render("attrezzatura");
});
