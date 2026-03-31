# 🎬 CineLab - Cyberpunk Movie Experience

CineLab è una web application sperimentale costruita con **React** e **Vite**, progettata per offrire un'esperienza cinematografica immersiva con un'interfaccia utente ispirata al design olografico e cyberpunk.

## 🚀 Caratteristiche Principali

- **UI Neon Premium**: Design basato su "Glassmorphism", effetti glitch e animazioni olografiche accelerate via GPU.
- **Advanced Filtering**: Sidebar interattiva per filtrare film per categorie multiple e anno di rilascio.
- **Sistema di Recensioni**: Form avanzato con feedback particellare, calcolo della distribuzione voti e persistenza delle bozze.
- **Hybrid Architecture**: Sistema "Smart-Switch" che gestisce dati Mock locali per lo sviluppo e API REST/MySQL per la produzione.
- **Performance Ottimizzate**: Lighthouse score eccellente grazie al lazy loading delle immagini, skeleton loaders e debouncing della ricerca.
- **Responsive Design**: Griglia fluida ottimizzata per 8 colonne su desktop e layout adattivo per mobile.

### 🛠️ Componenti Cyber UI

- **CyberDropdown**: Menu a tendina con animazione "Reveal" olografica e supporto icone.
- **CyberAccordion**: Filtri collassabili (chiusi di default) con intestazioni dinamiche che mostrano titolo e selezioni attive.
- **CountUp**: Animazione fluida dei contatori numerici con easing quadratico.
- **CyberScrollList**: Lista olografica a scorrimento interno per la selezione rapida dei dati.
- **CyberInput**: Campi di input olografici con varianti di stato (Success, Error, Gold) e glitch al focus.
- **ReviewItem**: Card recensione con entrata a cascata e formattazione data localizzata.
- **ReviewForm**: Sistema di recensioni con salvataggio bozza e particelle olografiche.

## 🛠️ Stack Tecnologico

- **Frontend**: React 18, React Router 6.
- **Styling**: CSS Modules (zero inline styles), React-Bootstrap (layout base), FontAwesome.
- **API**: Axios con sistema di Mocking integrato per lo sviluppo locale.
- **Animazioni**: CSS Keyframes, Clip-path animations, Staggered entrance.

## 📁 Struttura del Progetto

- `src/api/`: Logica di comunicazione con il backend e mock dei dati.
- `src/components/`: Componenti atomici e molecolari (MovieCard, Sidebar, ReviewForm, ecc.).
- `src/pages/`: View principali dell'applicazione (HomePage, DetailPage).
- `src/hooks/`: Custom hooks per il fetching dei dati e la gestione degli stati complessi.
- `docs/`: Documentazione tecnica e Cookbook per sviluppatori.

## 🔧 Installazione

1. Clona il repository.
2. Installa le dipendenze: `npm install`.
3. Avvia l'ambiente di sviluppo: `npm run dev`.

## 📖 Cookbook

Per approfondire i pattern architetturali e i trick CSS utilizzati, consulta il Cookbook.

---

_Sviluppato con ❤️ durante il corso Boolean._
