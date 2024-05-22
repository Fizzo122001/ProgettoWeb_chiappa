const sqlite3 = require("sqlite3").verbose();

class DataBase {
    constructor() {
        this.db = new sqlite3.Database("my.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Connesso al database SQLite.");
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

    findUserByEmail(email) {
        const sql = `SELECT * FROM utente WHERE email = ?`;

        return new Promise((resolve, reject) => {
            this.db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

module.exports = DataBase;
