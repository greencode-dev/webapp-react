import axios from 'axios';
import moviesData from '../data/cards'; // Assumiamo che il file esporti l'array predefinito

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export function getMovies(page = 1, limit = 10, search = '') {
    // In sviluppo, se non è configurata un'API, usiamo i dati locali con ritardo simulato
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        return new Promise((resolve) => {
            // Simulazione logica backend: Filtro -> Paginazione
            let filtered = [...moviesData];
            if (search) {
                filtered = filtered.filter(
                    (m) =>
                        m.title.toLowerCase().includes(search.toLowerCase()) ||
                        m.abstract.toLowerCase().includes(search.toLowerCase()),
                );
            }

            const total = filtered.length;
            const start = (page - 1) * limit;
            const paginatedData = filtered.slice(start, start + limit);

            setTimeout(
                () =>
                    resolve({
                        data: paginatedData,
                        total: total,
                    }),
                500,
            );
        });
    }
    // Invio dei parametri come query string: /movies?page=1&limit=3&search=abc
    return api
        .get('/movies', { params: { page, limit, search } })
        .then((response) => response.data);
}

export function getMovie(id) {
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        const movie = moviesData.find((m) => m.id === parseInt(id)); // Converte l'id in numero per il confronto
        return new Promise((resolve) => {
            setTimeout(() => resolve(movie), 300); // Risolve direttamente con l'oggetto film
        });
    }
    return api.get(`/movies/${id}`).then((response) => response.data);
}

export default api;
