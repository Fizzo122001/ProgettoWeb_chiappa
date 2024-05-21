if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // load .env file
}
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const morgan = require("morgan");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Imposta il motore di visualizzazione EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configurazione della sessione
app.use(
    session({
        secret: process.env.TOKEN_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("tiny"));


// Passport Local Strategy
app.use(passport.session());

// user authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await db.findUserByEmail(email);
        // user not found
        if (!user) return done(null, false);
        // hashing password
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return done(err);
            // password matched
            if (result) return done(null, user);
            // password mismatch
            else return done(null, false);
        });
    } catch (err) {
        // log error
        console.error("Error finding user by email:", err);
        // database error
        return done(err);
    }
}));

//INSERT INTO utente VALUES email,username,data_nascita,password 
// user serialization
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// user deserialization
passport.deserializeUser(async function (id, done) {
    try {
        const user = await db.findUserById(id);
        // user found
        done(null, user);
    } catch (err) {
        // log error
        console.error("Error finding user by id:", err);
        // pass error to Passport 
        done(err);
    }
});


app.get("/privacy", (req, res) => {
    res.render("privacy");
});


// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
