import axios from 'axios';
import moviesData from '../data/cards'; // Assumiamo che il file esporti l'array predefinito

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export function getMovies() {
    // In sviluppo, se non è configurata un'API, usiamo i dati locali con ritardo simulato
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(moviesData), 500); // Simula latenza di rete, risolve direttamente con l'array di film
        });
    }
    return api.get('/movies').then((response) => response.data);
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
