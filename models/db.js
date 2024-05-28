const sqlite3 = require("sqlite3").verbose();

class DataBase {
    constructor() {
        this.db = new sqlite3.Database("my.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } 
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Connessione al database chiusa.");
            }
        });
    }

    addNewUser(newUser, hashedPassword) {
        const sql = `INSERT INTO utente(email, username, password, data_nascita, coach)
                     VALUES(?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            this.db.run(
                sql,
                [
                    newUser.email,
                    newUser.username,
                    hashedPassword,
                    newUser.birthday,
                    0
                ],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                }
            );
        });
    }

    findUserByEmail(email, coachOnly = false) {
        let sql = `SELECT * FROM utente WHERE email = ?`;
        const params = [email];

        if (coachOnly) {
            sql += ` AND coach = 1`;
        }

        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    foundCoach() {
        const sql = `SELECT * FROM utente WHERE coach = ?`;
        const coachValue = 1;

        return new Promise((resolve, reject) => {
            this.db.all(sql, [coachValue], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    findProductsByName(name) {
        const sql = `SELECT immagine, nome, prezzo , codice FROM Prodotti WHERE nome LIKE ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [`%${name}%`], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getAllProducts() {
        const sql = `SELECT immagine, nome, prezzo ,codice FROM Prodotti`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    getServizi() {
        const sql = `SELECT * FROM servizi`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getOrdini(emailUtente) {
        const sql = `SELECT * FROM Ordini WHERE email_utente = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [emailUtente], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getAllOrdini() {
        const sql = `SELECT * FROM Ordini`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    offriServizio(nome, descrizione, immagine ,posti_disponibili) {
        const sql = `INSERT INTO servizi (nome, descrizione, immagine , posti_disponibili) VALUES (?, ?, ? ,?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [nome, descrizione, immagine , posti_disponibili], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    eliminaServizio(nome) {
        const sql = `DELETE FROM servizi WHERE nome = ?`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [nome], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    modificaServizio(nome, descrizione, immagine) {
        const sql = `UPDATE servizi SET descrizione = ?, immagine = ? WHERE nome = ?`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [descrizione, immagine, nome], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    recensioni(email_utente, descrizione) {
        const sql = `INSERT INTO recensioni (email_utente, descrizione) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [email_utente, descrizione], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getRecensioni() {
        const sql =  `SELECT * FROM recensioni`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows); 
                }
            });
        });
    }

    posti_disponibili(nome) {
        const sql = `UPDATE servizi SET posti_disponibili = posti_disponibili - 1 WHERE nome = ? AND posti_disponibili > 0`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [nome], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    
    
    
}

module.exports = DataBase;

