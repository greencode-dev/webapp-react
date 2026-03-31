# 📖 CineLab Coding Cookbook

Raccolta di pattern e soluzioni tecniche utilizzate nel progetto.

## 1. Recupero Dati (Custom Hook)

Per ogni nuova pagina che richiede dati dal backend, usa l'hook `useFetch`.

```javascript
const { data, loading, error, refetch } = useFetch(apiFunction, [arg1, arg2]);
```

## 2. Gestione Errori

Non gestire gli errori localmente. Usa il componente `ErrorDisplay`:

```javascript
if (error) return <ErrorDisplay message={error} onRetry={refetch} />;
```

## 3. Aggiungere uno stile Neon

Per nuovi elementi UI, preferisci le variabili CSS in `index.css`:

- `--primary-neon` per i bagliori cyan.
- `--secondary-neon` per i bagliori magenta.
- Classe `.glass-card` per contenitori con effetto vetro.

## 4. Paginazione e Ricerca (Server-side pattern)

Il progetto simula il comportamento di un server reale. Quando aggiungi filtri:

1. Passa le dipendenze al hook `useFetch` come array: `useFetch(getMovies, [page, limit, search, sortBy])`.
2. L'hook rigenererà la chiamata automaticamente al cambio di uno dei parametri.
3. Usa il **debouncing** per la ricerca testuale per evitare chiamate eccessive.

## 5. Skeleton Loaders

Invece di usare spinner bloccanti, usa i componenti Skeleton (`MovieCardSkeleton`, `MovieDetailSkeleton`):

- Mantengono il layout stabile durante il caricamento (prevenendo il Layout Shift).
- Usano l'animazione `.shimmer` definita in `index.css`.

## 6. API Service

Tutte le chiamate vanno in `src/services/api.js`.
Assicurati di gestire sempre il doppio scenario:

- **DEV**: Ritorna una Promise con i dati mock se `VITE_API_URL` manca.
- **PROD**: Usa l'istanza `axios` configurata.

## 7. Effetto Glitch (Cyberpunk Style)

2. Viene iniettata una variabile CSS `--entry-index` via style inline.
3. Il CSS calcola il ritardo: `animation-delay: calc(var(--entry-index) * 0.1s)`.
4. Viene eseguito il "Perimeter Scan" tramite lo pseudo-elemento `::before` con `clip-path`.

## 10. Interattività Avanzata (Mouse Tracking)

Per effetti come Tilt 3D o Spotlight:

1. Usa `onMouseMove` per catturare le coordinate relative: `e.clientX - rect.left`.
2. Inietta i valori come variabili CSS: `card.style.setProperty('--mouse-x', \`${x}px\`)`.
3. Nel CSS, usa `var(--mouse-x)` all'interno di `radial-gradient` o `transform`.
4. Ricorda sempre il reset su `onMouseLeave`.

## 11. Performance delle Immagini

Per ottimizzare il caricamento della pagina ed evitare il Layout Shift:

1. Usa sempre `loading="lazy"` sulle immagini dei poster.
2. Assicurati che il contenitore dell'immagine abbia un `aspect-ratio` definito via CSS (es. `2/3` per i poster).
3. Fornisci sempre un attributo `alt` descrittivo per l'accessibilità.

## 14. Animazione Neon Pulse (Breathing Glow)

Per simulare un'atmosfera cyberpunk realistica senza affaticare l'utente, applichiamo l'effetto "respiro" solo agli elementi di branding:

1. Usa la classe `.neon-pulse` per applicare un'animazione di respiro al bagliore.
2. L'animazione varia dolcemente il `text-shadow` e l' `opacity` per creare un effetto "vivo" e meno aggressivo del flicker.

## 15. Risoluzione Conflitti Z-Index e Clipping

Per gestire correttamente sovrapposizioni tra card animate e testate:

1. **Z-Index**: Imposta la testata su `z-index: auto` e gli elementi interattivi (card in hover) su un valore superiore (es. `20`).
2. **Clip-Path**: Rimuovi `clip-path` al termine delle animazioni di ingresso (`100% { clip-path: none; }`) per evitare il taglio netto degli elementi durante il movimento.
3. **Overflow**: Assicurati che il contenitore principale abbia `overflow: visible`.

## 17. Overlay Olografico Interattivo

Per sostituire i pulsanti CTA standard nelle card:

1. Avvolgi l'intero contenuto in un `Link`.
2. Crea un `.cyberOverlay` con `opacity: 0` e `backdrop-filter`.
3. Aggiungi una `.scanLine` animata verticalmente per simulare una scansione laser.
4. Mostra l'overlay solo su `:hover` dell'elemento genitore.

## 18. Transizioni di Pagina (Fade-in)

Per rendere il passaggio tra le rotte fluido:

1. Applica la classe globale `.page-fade-in` al container principale della pagina.
2. La classe utilizza un'animazione di opacità e un leggero movimento sull'asse Y.
3. Si integra con le animazioni a cascata degli elementi interni per un effetto "layered".

## 19. Transizioni di Uscita (Fade-out)

Per implementare una transizione fluida quando l'utente lascia la pagina:

1. Aggiungi la classe `.page-fade-out` in `index.css`.
2. Intercetta il click sul link/card.
3. Applica manualmente la classe al container della pagina (`document.querySelector`).
4. Usa un `setTimeout` per ritardare il `navigate()` di circa 400ms.

## 20. Navigazione Verticale (ScrollToTop)

Per facilitare la navigazione in pagine lunghe:

1. Usa il componente `ScrollToTop` che monitora l'evento `scroll` globale.
2. Implementa uno stato di visibilità basato sulla soglia di 400px.
3. Utilizza `window.scrollTo({ behavior: 'smooth' })` per la transizione fluida.

## 16. Sistema di Bozze (Persistence)

Per migliorare la UX nei form lunghi:

1. Usa `localStorage.setItem` agganciato a un `useEffect` che osserva lo stato del form.
2. Usa chiavi univoche basate sull'ID della risorsa (es. `review_draft_${movieId}`).
3. Rimuovi la bozza solo dopo un invio con successo o tramite azione esplicita di "Clear".

## 23. Glitch Clear Pattern

Per i campi di input che richiedono una cancellazione rapida:

1. Inserisci un tag `button` all'interno dell' `InputGroup`.
2. Applica un effetto `text-shadow` multi-livello (rosso e cyan) sull'hover per simulare l'aberrazione cromatica.
3. Assicurati che il pulsante sia accessibile via tastiera e che emetta un evento di cambio valore compatibile con i gestori React.

## 17. Cyber UI - CyberDropdown (Holographic Reveal)

Per mantenere la coerenza dei menu a tendina:

1. Usa il componente `CyberDropdown` invece di gestire manualmente i `Dropdown` di Bootstrap.
2. Supporta icone personalizzate via prop `items: [{ key, label, icon }]`.
3. Gestisce il caricamento asincrono tramite la prop `fetchItems`.
4. Utilizza animazioni basate su `clip-path` per svelare il contenuto senza causare scatti di layout (layout shift).

## 18. Cyber UI - CountUp (Olographic Counters)

Per visualizzare statistiche o contatori dinamici:

1. Usa il componente `CountUp`.
2. Implementa un easing `easeOutQuart` per simulare una scansione olografica.
3. Ideale per Sidebar, rating e dashboard dati.

## 19. Sidebar - Cyber Selection & Real-time Counts

Per migliorare la navigazione nei filtri:

1. Passa un oggetto `genreCounts` alla Sidebar.
2. I conteggi devono aggiornarsi in tempo reale in base agli altri filtri attivi (es. Anno).
3. Usa il `CountUp` all'interno dei label delle checkbox per un effetto "scansione dati" durante il filtraggio (applicato a Categorie e Anni).

## 21. Cyber UI - CyberAccordion

Pattern per gestire gruppi di filtri multipli:

1. Utilizza uno stato `openSection` per permettere l'apertura di un solo modulo alla volta.
2. Implementa una transizione fluida dell'altezza usando `grid-template-rows: 0fr -> 1fr`.
3. Pattern **Stacked Header**: l'etichetta del gruppo rimane sempre visibile, mentre le selezioni appaiono sotto di essa solo quando la sezione è chiusa.
4. Utilizza un `activeIndicator` (pallino neon pulsante) accanto al chevron quando la sezione è chiusa ma contiene filtri attivi.

## 22. Cyber UI - CyberScrollList

Pattern per liste a scorrimento interno:

1. Utilizza una scrollbar custom minimalista e neon.
2. Ogni item supporta un label, un'icona e un contatore `CountUp` integrato.
3. Gestisce lo stato attivo con ombre olografiche interne (`inset box-shadow`).
