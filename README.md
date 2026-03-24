# 🎬 CineLab - Neon Cinematic Experience

Benvenuto in **CineLab**, la tua piattaforma definitiva per esplorare il mondo del cinema con un'interfaccia moderna, immersiva e premium. Il progetto adotta un **Neon Theme** completo con effetti glassmorphism, animazioni fluide e una palette cyan/magenta curata.

---

## ✨ Caratteristiche del Design

| Elemento | Dettaglio |
|:---|:---|
| **Neon Aesthetic** | Palette vibrante (Cyan `#00d2ff` & Magenta `#bd00ff`) con effetti di bagliore (glow) |
| **Glassmorphism** | Card con effetto vetro sfumato (`backdrop-filter: blur`) e bordi semi-trasparenti |
| **Typography** | Font [Inter](https://fonts.google.com/specimen/Inter) con pesi 300–800 e gradienti |
| **Micro-animations** | Hover sulle card, scroll-reveal, anelli orbitanti nella pagina About |

---

## 📂 Struttura del Progetto

```
src/
├── assets/               # Immagini e risorse statiche
│   ├── about-hero.png
│   ├── logo-neon.png
│   └── main-bg.png
├── components/
│   ├── Header.jsx        # Navbar con logo neon e nav-link animati
│   ├── Footer.jsx        # Footer con branding neon
│   ├── MovieCard.jsx     # Card film in stile glassmorphism con poster zoom
│   └── ReviewCard.jsx    # Card recensione con avatar e stelle
├── data/
│   └── cards.js          # Dati mock dei film (titolo, regista, trama, recensioni)
├── layouts/
│   └── DefaultLayout.jsx # Layout con Header + Outlet + Footer
├── pages/
│   ├── HomePage.jsx      # Vetrina principale dei film
│   ├── About.jsx         # Pagina About con hero, stats, mission e features
│   ├── DetailPage.jsx    # Dettaglio film con trama e recensioni
│   └── NotFound.jsx      # Pagina 404
├── index.css             # Design system completo (variabili CSS, utility, animazioni)
├── main.jsx              # Entry point React
└── App.jsx               # Routing (React Router v7)
```

---

## 🎨 Design System (Quick Guide)

Classi utility riutilizzabili definite in `index.css`:

| Classe | Effetto |
|:---|:---|
| `.text-neon-primary` | Testo cyan con text-shadow glow |
| `.text-neon-secondary` | Testo magenta con text-shadow glow |
| `.text-gradient` | Gradiente cyan → magenta con `-webkit-background-clip` |
| `.glass-card` | Sfondo semi-trasparente con blur, bordo e shadow |
| `.btn-primary` | Bottone con gradiente neon e hover animato |
| `.poster-wrapper` | Contenitore poster con aspect-ratio 2:3 e zoom on hover |
| `.about-animate` | Scroll-reveal fade-in (richiede `IntersectionObserver`) |

### Variabili CSS principali

```css
--bg-dark:         #070815
--primary-neon:    #00d2ff
--secondary-neon:  #bd00ff
--glass-bg:        rgba(255, 255, 255, 0.03)
--glass-border:    rgba(255, 255, 255, 0.08)
```

---

## 🗺️ Pagine e Routing

| Percorso | Componente | Descrizione |
|:---|:---|:---|
| `/` | `HomePage` | Griglia dei film con card interattive |
| `/about` | `About` | Hero animato, statistiche, missione e film in evidenza |
| `/details/:id` | `DetailPage` | Dettaglio singolo film con poster, trama e recensioni |
| `*` | `NotFound` | Pagina 404 con redirect alla home |

---

## 🛠️ Stack Tecnologico

- **React 19** — UI library
- **React Router 7** — Navigazione SPA con rotte dinamiche
- **React Bootstrap 2** — Componenti layout (Grid, Navbar, Card)
- **Bootstrap 5.3** — Utilities CSS di base
- **Vite 8** — Build tool e dev server
- **ESLint 9** — Linting

---

## 🚀 Comandi Rapidi

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo (HMR su http://localhost:5173)
npm run dev

# Build di produzione
npm run build

# Anteprima della build
npm run preview

# Lint del codice
npm run lint
```

---

## 📝 Aggiungere un Nuovo Film

Aggiungi un oggetto al file `src/data/cards.js`:

```js
{
    id: 6,
    title: "Il Nuovo Film",
    director: "Nome Regista",
    genre: "Genre",
    release_year: 2025,
    abstract: "Una breve descrizione della trama...",
    image: "/movies_cover/nome_file.jpg",
    reviews: [
        { id: 8, author: "Autore", rating: 5, text: "Commento..." }
    ]
}
```

Inserisci la locandina nella cartella `public/movies_cover/`. La pagina di dettaglio verrà generata automaticamente grazie alle rotte dinamiche.
