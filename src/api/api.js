import axios from 'axios';
import moviesData from '../data/cards'; // Assumiamo che il file esporti l'array predefinito

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export function getMovies(
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'latest',
    genres = [],
    year = '',
) {
    // In sviluppo, se non è configurata un'API, usiamo i dati locali con ritardo simulato
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        return new Promise((resolve) => {
            // Calcoliamo la media dei voti dinamicamente per ogni film (simulando AVG() del DB)
            const processedData = moviesData.map((m) => {
                const totalRating = m.reviews?.reduce((acc, rev) => acc + rev.rating, 0) || 0;
                const avg = m.reviews?.length ? totalRating / m.reviews.length : 0;
                return { ...m, average_vote: avg };
            });

            let filtered = [...processedData];

            // Simulazione logica backend: Filtro
            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter(
                    (m) =>
                        m.title.toLowerCase().includes(s) ||
                        m.genre.toLowerCase().includes(s) ||
                        m.director.toLowerCase().includes(s) ||
                        m.release_year.toString().includes(s) ||
                        (m.actors && m.actors.some((a) => a.toLowerCase().includes(s))),
                );
            }

            // Filtro per Generi (se presenti)
            if (genres && genres.length > 0) {
                filtered = filtered.filter((m) => {
                    const movieGenres = m.genre.split('/').map((g) => g.trim());
                    return genres.some((selectedGenre) => movieGenres.includes(selectedGenre));
                });
            }

            // Filtro per Anno
            if (year) {
                filtered = filtered.filter((m) => m.release_year.toString() === year);
            }

            // Ordinamento
            if (sortBy === 'latest') filtered.sort((a, b) => b.release_year - a.release_year);
            if (sortBy === 'oldest') filtered.sort((a, b) => a.release_year - b.release_year);
            if (sortBy === 'rating_desc') filtered.sort((a, b) => b.average_vote - a.average_vote);
            if (sortBy === 'rating_asc') filtered.sort((a, b) => a.average_vote - b.average_vote);

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
        .get('/movies', { params: { page, limit, search, sortBy, genres: genres.join(','), year } })
        .then((response) => response.data);
}

export function getMovie(id) {
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        const found = moviesData.find((m) => m.id === parseInt(id));

        // Calcoliamo la media dinamica anche per il dettaglio
        let movie = null;
        if (found) {
            const totalRating = found.reviews?.reduce((acc, rev) => acc + rev.rating, 0) || 0;
            const avg = found.reviews?.length ? totalRating / found.reviews.length : 0;
            movie = { ...found, average_vote: avg };
        }

        return new Promise((resolve) => {
            setTimeout(() => resolve(movie), 300); // Risolve direttamente con l'oggetto film
        });
    }
    return api.get(`/movies/${id}`).then((response) => response.data);
}

export function postReview(id, data) {
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        // Simulazione persistenza nel mock locale per permettere il refresh dei dati
        const movie = moviesData.find((m) => m.id === parseInt(id));
        if (movie) {
            if (!movie.reviews) movie.reviews = [];
            const newReview = { id: Date.now(), ...data };
            movie.reviews.push(newReview);
        }

        return new Promise((resolve) => {
            console.log(`Mock API: Invio recensione per film ${id}`, data);
            setTimeout(() => resolve({ success: true }), 500);
        });
    }
    return api.post(`/movies/${id}/reviews`, data).then((response) => response.data);
}

export default api;
