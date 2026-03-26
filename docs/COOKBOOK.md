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

1. Aggiungi la classe `.glitch-title` (per titoli grandi) o `.card-glitch-text` (per testi piccoli).
2. Importante: aggiungi l'attributo `data-text` con lo stesso contenuto del tag:

```jsx
<h1 className="glitch-title" data-text="Titolo">
    Titolo
</h1>
```

Il CSS userà `content: attr(data-text)` per creare i cloni cromatici necessari all'animazione senza duplicare il testo nel DOM.
