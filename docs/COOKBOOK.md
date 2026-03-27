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

Per applicare l'effetto glitch a un testo:

1. Applica le classi dal relativo modulo CSS (es. `styles.glitchTitle` o `styles.cardGlitchText`).
2. Importante: aggiungi l'attributo `data-text` con lo stesso contenuto del tag:

```jsx
<h1 className="glitch-title" data-text="Titolo">
    Titolo
</h1>
```

Il CSS userà `content: attr(data-text)` per creare i cloni cromatici necessari all'animazione senza duplicare il testo nel DOM.

## 8. Materializzazione Olografica

Per l'ingresso dei risultati di ricerca, usiamo un pattern a cascata:

1. Il genitore (Col) riceve la classe `.movie-card-appearance`.
2. Viene iniettata una variabile CSS `--entry-index` via style inline.
3. Il CSS calcola il ritardo: `animation-delay: calc(var(--entry-index) * 0.1s)`.
4. Viene eseguito il "Perimeter Scan" tramite lo pseudo-elemento `::before` con `clip-path`.

## 9. Icone (Font Awesome)

Per mantenere la coerenza visiva e l'accessibilità:

1. Usa `FontAwesomeIcon` invece delle emoji.
2. Importa icone specifiche per ridurre il peso del bundle: `import { faStar } from '@fortawesome/free-solid-svg-icons'`.
3. Per i loghi social, usa il pacchetto `@fortawesome/free-brands-svg-icons`.
4. Applica stili neon (glow) via CSS Modules sfruttando il selettore `svg`.

## 10. Interattività Avanzata (Mouse Tracking)

Per effetti come Tilt 3D o Spotlight:

1. Usa `onMouseMove` per catturare le coordinate relative: `e.clientX - rect.left`.
2. Inietta i valori come variabili CSS: `card.style.setProperty('--mouse-x', \`${x}px\`)`.
3. Nel CSS, usa `var(--mouse-x)` all'interno di `radial-gradient` o `transform`.
4. Ricorda sempre il reset su `onMouseLeave`.

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

## 12. Sistema di Rating Interattivo

Per i form di valutazione, sostituiamo i dropdown con icone `faStar`:

- Usa uno stato `hoverRating` per il feedback visivo al passaggio del mouse.
- Applica classi CSS con `drop-shadow` per l'effetto neon sulle stelle attive.
- Gestisci il click per persistere la scelta nell'oggetto di stato del form.

## 13. Filtri Dinamici su Dati Derivati

Quando implementi filtri sulla UI (es. RatingBreakdown):

1. Usa `useMemo` per calcolare la lista filtrata basandoti su uno stato di filtro (es. `filterRating`).
2. Implementa una funzione di "toggle" (clicca per attivare, clicca di nuovo per disattivare).
3. Fornisci sempre un feedback visivo dell'azione e un pulsante di reset rapido.
4. Gestisci il caso "Empty State" se il filtro non produce risultati.
