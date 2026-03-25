import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export function getMovies() {
    return api.get("/movies").then(response => response.data);
}

export function getMovie(id) {
    return api.get(`/movies/${id}`).then(response => response.data);
}

export default api;
