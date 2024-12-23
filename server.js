if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // load .env file
}

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const morgan = require("morgan");

// Login and db
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const DataBase = require("./models/db");
const db = new DataBase();

// Server settings
const app = express();
const port = 3000;

const principaleRouter = require("./routes/principale");
const abbonamentiRouter = require("./routes/abbonamenti");
const accediRouter = require("./routes/accedi");
const logoutRouter = require("./routes/logout");
const registrazioneRouter = require("./routes/registrazione");
const attrezzaturaRouter = require("./routes/attrezzatura");
const contattiRouter = require("./routes/contatti");
const serviziRouter = require("./routes/servizi");
const carrelloRouter = require("./routes/carrello");
const serviziOffertiRouter = require("./routes/servizi_offerti");
const pagaRouter = require("./routes/paga");
const ordiniRouter = require("./routes/ordini");
const AllordiniRouter = require("./routes/Allordini");
const recensioniRouter = require("./routes/recensioni");
const prenotazioniRouter = require("./routes/prenotazioni");

// Passport sessions
app.use(
    session({
        secret: "miamadresposata",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Express server settings
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", principaleRouter);
app.use("/abbonamenti", abbonamentiRouter);
app.use("/accedi", accediRouter);
app.use("/logout", logoutRouter);
app.use("/registrazione", registrazioneRouter);
app.use("/attrezzatura", attrezzaturaRouter);
app.use("/contatti", contattiRouter);
app.use("/servizi", serviziRouter);
app.use("/carrello", carrelloRouter);
app.use("/servizi_offerti", serviziOffertiRouter);
app.use("/paga", pagaRouter);
app.use("/ordini", ordiniRouter);
app.use("/allordini", AllordiniRouter);
app.use("/recensioni", recensioniRouter);
app.use("/prenotazioni", prenotazioniRouter);
// app.use(morgan("tiny"));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await db.findUserByEmail(email);
        if (!user) return done(null, false);
        
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return done(err);
            if (result) return done(null, user);
            else return done(null, false);
        });
    } catch (err) {
        console.error("Error finding user by email:", err);
        return done(err);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    try {
        const user = await db.findUserByEmail(email);
        user.id = user.ID;
        done(null, user);
    } catch (err) {
        console.error("Error finding user by email:", err);
        done(err);
    }
});

app.get("/privacy", (req, res) => {
    res.render("privacy", {
        authenticated: req.isAuthenticated(),
        title: "Privacy policy"
    });
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
