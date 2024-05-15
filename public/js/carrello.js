var carrello = [];    

function inizializza() {
    if (localStorage.carrello) {
        carrello = JSON.parse(localStorage.carrello);
    }
}

function serializza() {
    localStorage.carrello = JSON.stringify(carrello);
}

function aggiungi(cod, descrizione, prezzo) {
    var oggetto = {
        codice: cod,
        descrizione: descrizione,
        prezzo: prezzo,
        qnt: 1
    };

    if (cod === -1) {
        carrello.push(oggetto);
    } else {
        carrello[indice].qnt++;
    }
    serializza();
    alert("Prodotto aggiunto al carrello"); 
}

function totali() {
    var totale = 0;

    for (var i = 0; i < carrello.length; i++) {
        var id = "t" + i;
        var prodotto = carrello[i];
        var totaleProdotto = prodotto.prezzo * prodotto.qnt;
        document.getElementById(id).textContent = totaleProdotto.toFixed(2);
        totale += totaleProdotto;
    }

    document.getElementById('totale').textContent = totale.toFixed(2);
    return totale;    
}

function cambia(cella) {
    var label = "q" + cella; 
    var v = document.getElementById(label).value;
    carrello[cella].qnt = v;
    serializza(); 
    totali();
}

function tabella() {
    var tableHTML = "<table border=1><th>Codice<th>Descrizione<th>Prezzo<th>Quantità/Ore<th>Totale";
    for (var i = 0; i < carrello.length; i++) {
        var prodotto = carrello[i];
        tableHTML += "<tr><td class=center>" + prodotto.codice;
        tableHTML += "<td>" + prodotto.descrizione;
        tableHTML += "<td class=right>" + prodotto.prezzo.toFixed(2);
        tableHTML += "<td><input onChange=cambia(" + i + ") class=center id=q" + i + " type=text size=4 value= " + prodotto.qnt + ">";
        tableHTML += "<td class=right id=t" + i + ">&nbsp;</tr>"; 
    }
    tableHTML += "<tr><td colspan=4 align=right>Importo Ordine<td class=right id=totale>&nbsp</table>";
    
    document.getElementById('elenco').innerHTML = tableHTML;            
}

function svuota() {
    localStorage.removeItem('carrello');
    carrello = [];
    tabella(); 
}

function paga() {
    if (localStorage.carrello) {
        var totale = totali(); 
        inviaOrdine(totale);
    } else {
        alert("Il carrello è vuoto, aggiungi almeno un prodotto per ordinare."); 
    }
}

function getUserEmail(req) {
    if (req.session && req.session.email) {
        return req.session.email;
    } else {
        return null;
    }
}

function inviaOrdine(totale) {
    if (localStorage.carrello) {
        var userEmail = getUserEmail();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/paga", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert("Ordine inviato con successo!");
                    localStorage.removeItem('carrello'); 
                    document.getElementById('elenco').innerHTML = "<p>Il carrello è stato svuotato</p>"; 
                } else {
                    alert("Si è verificato un errore durante l'invio dell'ordine.");
                }
            }
        };
        xhr.send(JSON.stringify({ email: userEmail, order: totale }));
    } else {
        alert("Il carrello è vuoto, aggiungi almeno un prodotto per ordinare."); 
    }
}

