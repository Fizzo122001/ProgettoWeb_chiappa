const sqlite3 = require("sqlite3").verbose();
let db;

class DataBase {
    open() {
        db = new sqlite3.Database("/my.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) throw console.error(err.message);
        });
    }

    close() {
        db.close((err) => {
            if (err) throw console.error(err.message);
        });
    }

    addNewUser(newUser, hashedPassword) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO utente(email, username, password, data_nascita, coach)
                    VALUES(?, ?, ?, ?, ?)`;
            
            this.open();
            db.run(
                sql,
                [
                    newUser.email,
                    newUser.username,
                    hashedPassword,
                    newUser.birthday,
                    0
                ],
                (err, row) => {
                    if (err) throw reject(err);
                    resolve(row);
                }
            );
            this.close();
        });
    }

    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM utente WHERE email = ?`;

            this.open();
            db.get(sql, [email], (err, row) => {
                if (err) throw reject(err);
                resolve(row);
            });
            this.close();
        });
    }
}

module.exports = DataBase;
