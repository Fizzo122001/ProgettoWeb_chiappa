const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const DataBase = require("../models/db");
const db = new DataBase();


router.get("/", (req, res) => {
    res.render("registrazione", {title: "Registrazione"});
});

router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addNewUser(
            req.body, 
            hashedPassword
        );
        return res.redirect("/");
    } catch (error) {
        console.log("Error while registering: ", error);
        res.redirect("/registrazione");
    }
});

module.exports = router;