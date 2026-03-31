import axios from 'axios';
import moviesData from '../data/cards'; // Assumiamo che il file esporti l'array predefinito

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

/**
 * Calcola la media dei voti partendo da un array di recensioni.
 * @param {Array} reviews - Array di oggetti recensione con proprietà rating.
 * @returns {number} Media dei voti o 0 se non ci sono recensioni.
 */
export function calculateAverageVote(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return totalRating / reviews.length;
}

export function getMovies(
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'latest',
    genres = [],
    years = [],
) {
    // In sviluppo, se non è configurata un'API, usiamo i dati locali con ritardo simulato
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        return new Promise((resolve) => {
            // Calcoliamo la media dei voti dinamicamente per ogni film (simulando AVG() del DB)
            const processedData = moviesData.map((m) => {
                return { ...m, average_vote: calculateAverageVote(m.reviews) };
            });

            let filtered = [...processedData];

            // Simulazione logica backend: Filtro
            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter(
                    (m) =>
                        m.title.toLowerCase().includes(s) ||
                        (Array.isArray(m.genre)
                            ? m.genre.some((g) => g.toLowerCase().includes(s))
                            : m.genre.toLowerCase().includes(s)) ||
                        m.director.toLowerCase().includes(s) ||
                        m.release_year.toString().includes(s) ||
                        (m.actors && m.actors.some((a) => a.toLowerCase().includes(s))),
                );
            }

            // Filtro per Generi (se presenti)
            if (genres && genres.length > 0) {
                filtered = filtered.filter((m) => {
                    const movieGenres = Array.isArray(m.genre)
                        ? m.genre
                        : m.genre.split('/').map((g) => g.trim());
                    return genres.some((selectedGenre) => movieGenres.includes(selectedGenre));
                });
            }

            // Filtro per Anno
            if (years && years.length > 0) {
                filtered = filtered.filter((m) =>
                    years.some((y) => y.toString() === m.release_year.toString()),
                );
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
        .get('/movies', {
            params: {
                page,
                limit,
                search,
                sortBy,
                genres: genres.join(','),
                years: years.join(','),
            },
        })
        .then((response) => response.data);
}

export function getMovie(id) {
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        const found = moviesData.find((m) => m.id === parseInt(id));

        // Calcoliamo la media dinamica anche per il dettaglio
        let movie = null;
        if (found) {
            movie = { ...found, average_vote: calculateAverageVote(found.reviews) };
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

export function deleteReview(movieId, reviewId) {
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        // Simulazione eliminazione nel mock locale
        const movie = moviesData.find((m) => m.id === parseInt(movieId));
        if (movie && movie.reviews) {
            movie.reviews = movie.reviews.filter((r) => r.id !== reviewId);
        }

        return new Promise((resolve) => {
            console.log(`Mock API: Eliminazione recensione ${reviewId} dal film ${movieId}`);
            setTimeout(() => resolve({ success: true }), 400);
        });
    }
    return api.delete(`/movies/${movieId}/reviews/${reviewId}`).then((response) => response.data);
}

export default api;
