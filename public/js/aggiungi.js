function aggiungi(cod, descrizione, prezzo) {
    var carrello = [];
    if (localStorage.getItem('carrello')) {
        carrello = JSON.parse(localStorage.getItem('carrello'));
    }

    var elementoPresente = carrello.find(item => item.codice === cod);

    if (elementoPresente) {
        elementoPresente.quantita++;
    } else {
        carrello.push({
            codice: cod,
            descrizione: descrizione,
            prezzo: prezzo,
            quantita: 1
        });
    }

    try {
        
        localStorage.setItem('carrello', JSON.stringify(carrello));
        alert(descrizione + " aggiunto al carrello!");
    } catch (error) {
        console.error("Impossibile aggiungere al carrello:", error.message);
        alert("Si è verificato un errore durante l'aggiunta al carrello.");
    }
}
