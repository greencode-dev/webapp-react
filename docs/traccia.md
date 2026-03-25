Ciao studente, completiamo la nostra applicazione collegando il frontend React al backend Express che restituisce in json i dati del DB.

MILESTONE 1
Installate il pacchetto cors sull'applicazione express webapp-express
Importate, configurate e abilitate il CORS per l'indirizzo su cui gira la vostra applicazione React
Mini-bonus: impostate l'indirizzo del frontend nel file .env invece che schiantato a mano in stringa

MILESTONE 2
Spostiamoci su webapp-react. Nella pagina con la lista dei film aggiungiamo una chiamata axios per recuperarli dalla nostra web-api, stampandoli in console
Se tutto funziona, spostiamo i dati in uno state su cui iteriamo per generare le cards dei film

MILESTONE 3
Come la milestone precedente, ma per recuperare il dettaglio del singolo film (titolo, autore, ecc..)
Una volte stampati in pagina i dati del film, procedete a generare dinamicamente le card delle recensioni. Prima verificate che la vostra web-api restituisca quel dato (v. postman e/o console.log)
Mini-bonus: attenzione alle dipendenze dello useEffect

BONUS
Caricate le immagini nel public del backend, ma visualizzatele da React
Super-bonus: nel controller che recupera i dati del singolo film modificate la query per restituire anche la media delle relative recensioni. Vi serviranno una join e la funzione AVG: componete prima la query funzionante su Workbench (es. per id=3) e poi vi spostate su express parametrizzando l'id.
Migliorate il layout come credete

NOTE
Ricordatevi che dovrete lavorare con due VS Code aperti ognuno su un un progetto (express e react) e lanciare i relativi server di sviluppo
Nel live coding pushato mancano le key quando si itera su qualcosa.map. Per far scomparire il warning assicuratevi di iterare correttamente. I vostri dati hanno un id 😉
