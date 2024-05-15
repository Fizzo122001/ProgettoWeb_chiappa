const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const dbPath = path.resolve(__dirname, 'my.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Errore durante la connessione al database', err.message);
        throw err;
    }
    console.log('Connesso al database SQLite');
});

app.use(session({
    secret: 'supersegreto',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.loggedin = req.session.loggedin || false;
    res.locals.email = req.session.email || null;
    next();
});

app.get('/', (req, res) => {
    res.render('principale');
});

app.get('/principale', (req, res) => {
    res.render('principale');
});

app.get('/carrello', (req, res) => {
    if (res.locals.loggedin) {
        res.render('carrello');
    } else {
        res.redirect('/accedi?alert=autenticati');
    }
});

app.get('/contatti', (req, res) => {
    res.render('contatti');
});

app.get('/registrazione', (req, res) => {
    res.render('registrazione');
});

app.get('/servizi', (req, res) => {
    if (req.session.loggedin && req.session.ruolo === 'coach') {
        res.render('servizi');
    } else {
        res.redirect('/accedi?alert=nonautorizzato');
    }
});

app.get('/abbonamenti', (req, res) => {
    res.render('abbonamenti');
});

app.get('/strumentazione', (req, res) => {
    res.render('strumentazione');
});

app.get('/paga-ora', (req, res) => {
    res.render('paga-ora');
});

app.get('/accedi', (req, res) => {
    const { alert } = req.query;
    let message;
    if (alert === 'nonautorizzato') {
        message = 'Devi essere un coach per accedere a questa pagina.';
    } else {
        message = alert ? 'Autenticati per accedere al carrello.' : null;
    }
    res.render('accedi', { message: message });
});

app.get('/registrato', (req, res) => {
    if (!res.locals.loggedin) {
        return res.redirect('/accedi');
    }
    res.render('registrato');
});


app.post('/accedi', (req, res) => {
    const { username, password, email } = req.body;
    const sqlUtente = 'SELECT email, username FROM utente WHERE username = ? AND password = ? AND email = ?';
    const sqlCoach = 'SELECT email, username FROM coach WHERE username = ? AND password = ? AND email = ?';

    db.get(sqlUtente, [username, password, email], (err, rowUtente) => {
        if (err) {
            throw err;
        }
        if (rowUtente) {
            req.session.loggedin = true;
            req.session.email = email;
            res.redirect('/carrello');
        } else {
            db.get(sqlCoach, [username, password, email], (err, rowCoach) => {
                if (err) {
                    throw err;
                }
                if (rowCoach) {
                    req.session.loggedin = true;
                    req.session.email = email;
                    req.session.ruolo = 'coach';
                    res.redirect('/servizi');
                } else {
                    res.render('accedi', { message: 'Credenziali non valide. Riprova.' });
                }
            });
        }
    });
});

app.post('/registrazione', (req, res) => {
    const { username, password, birthdate, email } = req.body;
    const sqlCheckUsername = 'SELECT * FROM utente WHERE username = ?';
    const sqlInsertUtente = 'INSERT INTO utente (username, password, data_nascita, email) VALUES (?, ?, ?, ?)';

    db.get(sqlCheckUsername, [username], (err, row) => {
        if (err) {
            console.error(err.message);
            res.render('registrazione', { message: 'Si è verificato un errore durante la registrazione. Riprova.' });
        }
        else {
            db.run(sqlInsertUtente, [username, password, birthdate, email], function (err) {
                if (err) {
                    console.error(err.message);
                    res.render('registrazione', { message: 'Si è verificato un errore durante la registrazione. Riprova.' });
                } else {
                    req.session.loggedin = true;
                    req.session.email = email;
                    res.redirect('/registrato');
                }
            });
        }
    });
});

app.post('/paga', (req, res) => {
    if (req.session.loggedin && req.session.email) {
        const userEmail = req.session.email;
        const order = req.body.order; 

        const sqlInsertOrder = 'INSERT INTO ordini (utente, prezzo_ordine) VALUES (?, ?)';
        db.run(sqlInsertOrder, [userEmail, order], function(err) {
            if (err) {
                console.error('Errore durante l\'inserimento dell\'ordine:', err.message);
                res.sendStatus(500);
                return;
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Errore durante il logout:', err);
            res.sendStatus(500);
            return;
        } else {
            res.redirect('/principale');
        }
    });
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});