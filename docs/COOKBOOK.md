# 📖 CineLab Coding Cookbook

Raccolta di pattern e soluzioni tecniche utilizzate nel progetto.

## 1. Recupero Dati (Custom Hook)

Per ogni nuova pagina che richiede dati dal backend, usa l'hook `useFetch`.

```javascript
const { data, loading, error, refetch } = useFetch(apiFunction, arg1, arg2);
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

Per pulsanti o titoli con stile "disturbato":

1. Applica la classe `.glitch-hover` definita in `index.css`.
2. L'effetto sfrutta `clip-path` e pseudo-elementi per creare sdoppiamenti cromatici (RGB split).

## 9. Animazioni di Entrata a Cascata (Staggered)

1. Passa l'indice della mappa al componente: `<MovieCard index={i} />`.
2. Viene iniettata una variabile CSS `--entry-index` via style inline nel componente.
3. Il CSS calcola il ritardo: `animation-delay: calc(var(--entry-index) * 0.1s)`.

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

## 21. Movie Cards Compatte e Neon Hover

Per massimizzare la densità di informazioni senza sacrificare l'estetica:

1. **Dimensioni**: Imposta un `max-width` di `160px` per una visualizzazione a griglia densa e professionale (Netflix-style).
2. **Aspect Ratio**: Usa sempre `aspect-ratio: 2 / 3` per i poster per garantire uniformità e prevenire layout shift.
3. **Hover Feedback**:
    - Usa `translateY` negativo per dare profondità.
    - Applica `box-shadow` con variabili `--primary-glow` per l'effetto neon.
    - Scala l'immagine interna (`transform: scale(1.1)`) per un feedback dinamico.
4. **Ottimizzazione Testi**: Per card molto piccole, usa `text-overflow: ellipsis` per evitare che titoli lunghi rompano il layout.
5. **Grid Parent Layout (⚠️ Risoluzione Bug 3 Colonne)**: Se vedi ancora 3 colonne larghe, è perché Bootstrap sta imponendo la sua griglia a dodicesimi. **Rimuovi i componenti `<Row>` e `<Col>`** di Bootstrap nella HomePage e usa un `div` con la classe `.movieGrid`.

```css
/* Esempio in HomePage.module.css */
.movieGrid {
    display: grid;
    /* minmax(140px) garantisce 5-6 colonne su desktop (1080p) e 2 su mobile */
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 24px;
    justify-content: center;
    padding: 20px;
    width: 100%;
}
```

## 23. Badge "NEW" / "HOT" sulle MovieCard

Per evidenziare film recenti o popolari:

1. Aggiungi un elemento `div` con classe `.badge` all'interno della `MovieCard`.
2. Posizionalo in un angolo (es. `top: 8px; right: 8px;`) con `position: absolute`.
3. Applica stili di testo compatti e un `box-shadow` neon.
4. Usa un'animazione `neonPulseBadge` per un effetto di bagliore pulsante.
5. Differenzia i badge (es. `.badgeHot`) con colori e animazioni diverse.

## 24. Ottimizzazione Tipografia per Griglie Densi

Per mantenere la leggibilità in griglie con 8+ colonne:

1. Riduci il `font-size` dei titoli a `0.72rem` e dei meta-dati a `0.65rem`.
2. Riduci il `padding` interno della sezione info a `6px 8px`.
3. Utilizza `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` per titoli e generi lunghi.
4. Limita la `max-width` del genere per evitare che spinga il voto fuori dalla card.
   }

```

## 22. Supporto WebP e Modern Formats

Assicurati di caricare immagini in formato WebP ove possibile. Se l'API ritorna JPG, considera l'implementazione di un proxy di trasformazione o l'uso di attributi `srcset` per servire versioni ottimizzate.

## 16. Sistema di Bozze (Persistence)

Per migliorare la UX nei form lunghi:

1. Usa `localStorage.setItem` agganciato a un `useEffect` che osserva lo stato del form.
2. Usa chiavi univoche basate sull'ID della risorsa (es. `review_draft_${movieId}`).
3. Rimuovi la bozza solo dopo un invio con successo o tramite azione esplicita di "Clear".

## 25. Sidebar dei Filtri con Animazione Slide-in

Per un'esperienza di filtraggio premium e modulare:
1. **Componente Dedicato**: Sposta la logica dei filtri in `src/components/Sidebar.jsx`.
2. **Animazione**: Applica un'animazione `slideIn` con `cubic-bezier` per un ingresso fluido da sinistra.
3. **Logica di Filtraggio**: Nel backend (o mock API), gestisci i generi multipli dividendo la stringa dei generi del film (es. `Action/Sci-Fi`) per permettere match parziali ma precisi.
4. **Responsive**: Su schermi piccoli, trasforma la sidebar in un elemento statico o a scomparsa per non occupare spazio orizzontale prezioso.

## 26. Pulsante Reset con Effetto Glitch

Per un feedback visivo aggressivo e cyberpunk:
1. **Pseudo-elemento**: Usa `::before` con `content: attr(data-text)` per sovrapporre il testo "disturbato".
2. **Clip-path Animation**: Crea un'animazione `@keyframes` che varia rapidamente il `clip-path` (inset) per simulare un errore di scansione digitale durante l'hover.

## 27. Particelle Olografiche (Success Feedback)

Per celebrare un'azione completata (es. invio recensione):
1. **Componente Stateless**: Crea un contenitore di particelle che mappa un array vuoto per generare elementi DOM.
2. **CSS Variables**: Usa `--i` per randomizzare il ritardo e la posizione delle particelle tramite `calc()`.
3. **Animazione**: Combina `opacity` e `translateY` per simulare la dissolvenza di un ologramma.

## 28. Filtraggio Multi-Genere (Logic)

Quando un film appartiene a più categorie (es. `Action/Sci-Fi`):
1. Usa `.split('/')` per trasformare la stringa del database in un array.
2. Usa `.some()` per verificare se almeno uno dei generi selezionati dall'utente è presente nel film.
3. Questo garantisce che il film "Titanic" (Romance/Drama) appaia sia sotto "Romance" che sotto "Drama".

## 26. Pulsante Reset con Effetto Glitch

Per un feedback visivo aggressivo e cyberpunk:
1. **Pseudo-elemento**: Usa `::before` con `content: attr(data-text)` per sovrapporre il testo "disturbato".
2. **Clip-path Animation**: Crea un'animazione `@keyframes` che varia rapidamente il `clip-path` (inset) per simulare un errore di scansione digitale durante l'hover.
```
