// Database setup
const dbPath = path.resolve(__dirname, "my.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Errore durante la connessione al database", err.message);
        throw err;
    }
    console.log("Connesso al database SQLite");
});