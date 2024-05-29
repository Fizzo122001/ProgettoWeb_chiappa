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
        const sql = `INSERT INTO Utenti(email, username, password, data_nascita, coach)
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
        let sql = `SELECT * FROM Utenti WHERE email = ?`;
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
        const sql = `SELECT * FROM Utenti WHERE coach = ?`;
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
        const sql = `SELECT * FROM Prodotti WHERE nome LIKE ?`;
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
        const sql = `SELECT * FROM Prodotti`;
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
        const sql = `SELECT * FROM Servizi`;
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

    getOrdini(idUtente) {
        const sql = `SELECT * FROM Ordini WHERE id_utente = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [idUtente], (err, rows) => {
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

    offriServizio(nome, descrizione, immagine, posti_disponibili) {
        const sql = `INSERT INTO Servizi (nome, descrizione, immagine , posti_disponibili) VALUES (?, ?, ? ,?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [nome, descrizione, immagine, posti_disponibili], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    eliminaServizio(id) {
        const sql = `DELETE FROM Servizi WHERE ID = ?`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    modificaServizio(ID, nome, descrizione, immagine) {
        const sql = `UPDATE Servizi SET nome = ?, descrizione = ?, immagine = ? WHERE ID = ?`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [nome, descrizione, immagine, ID], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    

    recensioni(id_utente, commento) {
        const sql = `INSERT INTO recensioni (id_utente, commento) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [id_utente, commento], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getRecensioni() {
        const sql = `SELECT * FROM recensioni`;
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

    posti_disponibili(ID) {
        const sql = `UPDATE Servizi SET posti_disponibili = posti_disponibili - 1 WHERE ID = ? AND posti_disponibili > 0`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [ID], function (err) {
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

