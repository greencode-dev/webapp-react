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
