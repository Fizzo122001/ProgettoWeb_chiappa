let carrello = [];

function inizializza() {
    document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.carrello) {
            try {
                carrello = JSON.parse(localStorage.carrello);
            } catch (e) {
                console.error("Error parsing carrello from localStorage", e);
                carrello = [];
            }
        }
        elencoCarrello();
    });
}

function serializza() {
    localStorage.setItem('carrello', JSON.stringify(carrello));
}

function cerca(cod) {
    for (let i = 0; i < carrello.length; i++) {
        if (carrello[i].codice === cod) {
            return i;
        }
    }
    return -1;
}

function aggiungi(cod, prezzo, descrizione, img) {
    let ogg = {};
    let n = carrello.length;
    let x = cerca(cod);
    if (x === -1) {
        ogg.codice = cod;
        ogg.prezzo = prezzo;
        ogg.descr = descrizione;
        ogg.img = img;
        ogg.qnt = 1;
        carrello[n] = ogg;
    } else {
        carrello[x].qnt++;
    }
    serializza();
}

function cambia(index) {
    let quantityInput = document.getElementById(`form${index}`);
    carrello[index].qnt = parseInt(quantityInput.value);
    serializza();
    aggiornaTotale();
}

function aggiornaTotale() {
    let totale = 0;
    for (let i = 0; i < carrello.length; i++) {
        totale += carrello[i].prezzo * carrello[i].qnt;
    }
    document.getElementById('totale').innerText = `€ ${totale.toFixed(2)}`;
    document.getElementById('totaleCarrello').innerText = `€ ${totale.toFixed(2)}`;
}

function elencoCarrello() {
    let elencoDiv = document.getElementById('elenco');
    elencoDiv.innerHTML = ""; // Pulisce il div prima di aggiungere nuovi elementi

    for (let i = 0; i < carrello.length; i++) {
        let item = carrello[i];
        let itemHtml = `
            <div class="row mb-4 d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                    <img src="${item.img}" class="img-fluid rounded-3" alt="${item.descr}">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="text-muted">Shirt</h6>
                    <h6 class="text-black mb-0">${item.descr}</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button class="btn btn-link px-1" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); cambia(${i})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input id="form${i}" min="0" name="quantity" value="${item.qnt}" type="number" class="form-control form-control-sm" onchange="cambia(${i})" />
                    <button class="btn btn-link px-1" onclick="this.parentNode.querySelector('input[type=number]').stepUp(); cambia(${i})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 class="mb-0">€ ${item.prezzo.toFixed(2)}</h6>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                    <a href="#!" class="text-muted" onclick="rimuoviElemento(${i})"><i class="fas fa-times"></i></a>
                </div>
            </div>
            <hr class="my-4">`;

        elencoDiv.innerHTML += itemHtml;
    }

    elencoDiv.innerHTML += `
        <div class="row mb-4 d-flex justify-content-end">
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">Totale: <span id="totale">€ 0.00</span></h6>
            </div>
        </div>`;

    aggiornaTotale();
}

function rimuoviElemento(index) {
    carrello.splice(index, 1);
    serializza();
    elencoCarrello();
}

function paga() {
    if (carrello.length > 0) {
        let totale = 0;
        for (let i = 0; i < carrello.length; i++) {
            totale += carrello[i].prezzo * carrello[i].qnt;
        }
        alert(`Hai pagato € ${totale.toFixed(2)}`);
        carrello = [];
        serializza();
        elencoCarrello();
    } else {
        alert("Il carrello è vuoto, aggiungi almeno un prodotto per ordinare.");
    }
}



inizializza();
