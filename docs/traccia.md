# Progetto: WebApp React

Iniziamo a realizzare il frontend che visualizzerà i dati della nostra Web API.

---

## 🏗️ MILESTONE 0: Pianificazione

Ragionate sulla struttura dell'applicazione che volete realizzare:

- Di quali e quante pagine ho bisogno?
- Avranno bisogno di qualche componente?
- Ci sono componenti riutilizzabili più volte?
- Di quali props hanno bisogno?

> [!TIP]
> Iniziate a immaginare il risultato finale prima di scrivere una sola riga di codice.

---

## 🚀 MILESTONE 1: Setup

- **Avvio Progetto**: Iniziate un nuovo progetto React con Vite.
- **Cleanup**: Ripulite lo scaffold da file e codice di esempio non necessari.
- **Verifica**: Assicuratevi che tutto funzioni correttamente.

---

## 🛣️ MILESTONE 2: Routing & Layout

- **React Router**: Installate `react-router-dom`.
- **Layout**: Create un layout di base per la vostra applicazione.
- **Pagine**: Create almeno 2 pagine:
  - Una per la lista dei film.
  - Una per il dettaglio del film (usando l'id come parametro).
- **Rotte**: Impostate le rotte per navigare tra le pagine.

---

## 🎬 MILESTONE 3: Componenti & Mock Data

- **Layout Elenco**: Nella pagina dei film, preparate il layout per accogliere una lista di card.
- **Componente Card**: Realizzate il componente `MovieCard`. Deve accettare i dati del film tramite `props`.
- **Mocking**: Nella pagina, preparate un oggetto con la stessa struttura di un film e passatelo al componente card.
- **Link**: La card deve avere un link che punta a `/movies/:id`.

> [!NOTE]
> **MINI-BONUS**: Potete preparare un array in cui ripetere più volte lo stesso film, o addirittura film diversi. Non perdeteci troppo tempo, martedì prenderemo i dati reali dalle Web API!

---

## ⭐ BONUS

- **Dettaglio**: Nella pagina di dettaglio, predisponete un titolo e una descrizione placeholder.
- **Recensioni**: Sotto il dettaglio, implementate delle **ReviewCard** (voto, autore, testo, ecc.).

---

**Buon Lavoro!** 👨‍💻👩‍💻
