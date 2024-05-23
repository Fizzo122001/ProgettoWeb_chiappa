const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();

router.get("/registrazione", (req, res) => {
    res.render("registrazione", {title: "Registrazione"});
});

router.post("/registrazione", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addNewUser(
            req.body, 
            hashedPassword
        );
        res.redirect("/principale");
    } catch (error) {
        console.log("Error while registering: ", error);
        res.redirect("/registrazione");
    }
});

module.exports = router;