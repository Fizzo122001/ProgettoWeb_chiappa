var carrello = new Array();    /* carrello con gli acquisti. Vettore di oggetti contenenti codice, prezzo, quantita
                                           di ciascun prodotto */

function inizializza() {
/* se esiste un carrello aggiorna la variabile con il contenuto di localStorage */
  
   if (localStorage.carrello) {
        carrello = eval(localStorage.carrello);
   }
  
}

function serializza() {
/* trasforma il carrello in una stringa e lo memorizza mediante cookies (localStorage)
   nel disco del client */
   var cart = "[";
   var comma = "";
   for(i=0;i<carrello.length;i++) {
       cart = cart + comma; 
       cart = cart + " {codice : " + carrello[i].codice;
       cart = cart + ", descr: '" + carrello[i].descr + "'"; 
       cart = cart + ", prezzo : " + carrello[i].prezzo;
       cart = cart + ", qnt : " + carrello[i].qnt + "}";
       comma = ',';
   } 
   cart = cart + "]";
   delete localStorage.carrello;
   localStorage.carrello = cart; 
}

function cerca(cod) {
/* restituisce la posizione di un prodotto gia presente in carrello
   Se non esiste: 'N' */
   for (var i=0;i<carrello.length;i++) {
        if (carrello[i].codice == cod) {
            return(i);
        }
   }
   return("N");
}

function aggiungi(cod,prezzo, descrizione) {
/* aggiunge un prodotto al carrello */
   var ogg = {};
   var n = carrello.length;
   var x = cerca(cod);
   if (x == 'N') {     
       ogg.codice  = cod;
       ogg.prezzo  = prezzo;
       ogg.descr   = descrizione;
       ogg.qnt     = 1;
       carrello[n] = ogg;
   } else { 
       carrello[x].qnt++;
   }
   serializza();
   alert("prodotto aggiunto al carrello"); 
}
        
         
/* -------------------------- Funzioni per la pagina Carrello -----------------------------*/

      function totali () {
      /* calcola e visualizza i totali */
           
           var obj, tot=0, tp=0;
           for (i=0;i< carrello.length; i++) {
                var id = "t"+i;
                obj = document.getElementById(id);
                tp = carrello[i].prezzo * carrello[i].qnt;
                obj.innerHTML = tp;
                tot = tot + tp;
           }
           document.getElementById('totale').innerHTML = tot;
          
      }

      function cambia(cella) {
      /* una delle quantita e' cambiata aggiorna le variabili */
          var label = "q"+cella; 
          var v   = document.getElementById(label).value;
          carrello[cella].qnt = v;
          serializza(); 
          totali();
      }

      function tabella() {
             document.write("<TABLE border=1><TH>Codice<TH>Descrizione<TH>prezzo<TH>Quantita<TH>Totale\n ");
             for(var i=0; i<carrello.length; i++) {
                 document.write("<TR><TD class=center>"+carrello[i].codice);
                 document.write("<TD> " + carrello[i].descr);
                 document.write("<TD class=right>"+carrello[i].prezzo);
                 document.write("<TD><input onChange=cambia(" + i + ") class=center id=q" + i + " type=text size=4 value= " + carrello[i].qnt + ">");
                 document.write("<TD class=right id=t"+i+">&nbsp;\n"); 
             }
             document.write("<TR><TD colspan=4 align=right>Importo Ordine <TD class=right id=totale>&nbsp\n");
             document.write("</TABLE>\n");            
      }

      function svuota() {
            delete localStorage.carrello;
            document.getElementById('elenco').innerHTML =
                                 "<TABLE border=1><TH>Codice<TH>prezzo<TH>Quantita<TH>Totale</TABLE>";            
      }

      function paga() {
        if (localStorage.carrello) {
            var totale = totali();
            alert("Hai pagato " + totale.toFixed(2) + "€");
            svuota();
        } else {
            alert("Il carrello è vuoto, aggiungi almeno un prodotto per ordinare.");
        }
    }


