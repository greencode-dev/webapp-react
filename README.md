# 🎬 CineLab - Neon Cinematic Experience

![Anteprima Home Page](./docs/images/homepage-preview.png)

Benvenuto in **CineLab**, la tua piattaforma definitiva per esplorare il mondo del cinema con un'interfaccia moderna, immersiva e premium. Questo progetto è stato trasformato con un **Neon Theme Overhaul** completo.

---

## ✨ Caratteristiche del Design
CineLab utilizza un sistema di design custom basato su:
-   **Neon Aesthetic**: Palette vibrante (Cyan & Magenta) con effetti di bagliore (glow).
-   **Glassmorphism**: Componenti e card con effetto vetro acidato e sfocatura dello sfondo.
-   **Cinematic typography**: Utilizzo del font 'Inter' con variazioni di peso e gradienti.

---

## 🏗️ Architettura del Progetto

-   **`src/data/`**: Contiene `cards.js` con i dati mock dei film e delle recensioni.
-   **`src/components/`**: 
    -   `Header.jsx`: Navbar con logo neon e link animati.
    -   `MovieCard.jsx`: Card in stile glassmorphism per la vetrina film.
    -   `ReviewCard.jsx`: Commenti degli utenti con accenti neon.
-   **`src/pages/`**: 
    -   `HomePage.jsx`: Il centro dell'esperienza con i film in evidenza.
    -   `DetailPage.jsx`: Vista dettagliata con trama e recensioni.
-   **`src/index.css`**: Il cuore pulsante del design system (variabili CSS e utility neon).

---

## 🎨 Design System (Quick Guide)

Se vuoi aggiungere nuovi elementi coerenti, usa queste classi:
-   `.text-neon-primary`: Testo cyan con bagliore.
-   `.text-neon-secondary`: Testo magenta con bagliore.
-   `.text-gradient`: Gradiente cyan-to-magenta.
-   `.glass-card`: Applica l'effetto vetro (sfondo semi-trasparente, blur e border).
-   `.btn-primary`: Bottone con gradiente neon e hover animato.

---

## 🚀 Comandi Rapidi
-   `npm run dev`: Avvia l'ambiente di sviluppo (Vite).
-   `npm run build`: Genera la build di produzione.
-   `npm install`: Installa le dipendenze.

---

## 📖 Sviluppo
Il progetto utilizza **React 19**, **Bootstrap 5.3** (per il layout core) e **React Router 7** per la navigazione dinamica. Ogni film aggiunto a `src/data/cards.js` genera automaticamente una pagina di dettaglio grazie alle rotte dinamiche.
