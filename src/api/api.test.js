import { describe, it, expect } from 'vitest';
import { calculateAverageVote, getMovie, getMovies } from './api';

describe('API Logic - calculateAverageVote', () => {
    it('should return 0 if reviews are null or undefined', () => {
        expect(calculateAverageVote(null)).toBe(0);
        expect(calculateAverageVote(undefined)).toBe(0);
    });

    it('should return 0 if reviews array is empty', () => {
        expect(calculateAverageVote([])).toBe(0);
    });

    it('should calculate the correct average for an array of ratings', () => {
        const reviews = [{ rating: 5 }, { rating: 4 }, { rating: 3 }];
        // (5 + 4 + 3) / 3 = 12 / 3 = 4
        expect(calculateAverageVote(reviews)).toBe(4);
    });

    it('should handle decimal results correctly', () => {
        const reviews = [{ rating: 5 }, { rating: 4 }];
        // (5 + 4) / 2 = 4.5
        expect(calculateAverageVote(reviews)).toBe(4.5);
    });
});

describe('API Integration - getMovie', () => {
    it('should return a movie object with the correct average_vote for a valid ID', async () => {
        // Assumiamo che l'ID 1 esista nel nostro file mock data/cards.js
        const movie = await getMovie(1);

        if (movie) {
            expect(movie).toHaveProperty('id', 1);
            expect(movie).toHaveProperty('title');
            expect(movie).toHaveProperty('average_vote');

            // Verifica che il valore di average_vote sia coerente con la logica di calcolo
            // applicata alle recensioni contenute nel film restituito
            const expectedAverage = calculateAverageVote(movie.reviews);
            expect(movie.average_vote).toBe(expectedAverage);
        }
    });

    it('should return null if the movie ID is not found', async () => {
        const movie = await getMovie(999999); // ID inesistente
        expect(movie).toBeNull();
    });
});

describe('API Integration - getMovies filters', () => {
    it('should filter by a single genre correctly', async () => {
        const genre = 'Sci-Fi';
        const result = await getMovies(1, 10, '', 'latest', [genre], []);

        expect(result.data.length).toBeGreaterThan(0);
        result.data.forEach((movie) => {
            const mGenres = Array.isArray(movie.genre)
                ? movie.genre
                : movie.genre.split('/').map((g) => g.trim());
            expect(mGenres).toContain(genre);
        });
    });

    it('should filter by multiple genres correctly (OR logic)', async () => {
        const genres = ['Sci-Fi', 'Action'];
        const result = await getMovies(1, 10, '', 'latest', genres, []);

        expect(result.data.length).toBeGreaterThan(0);
        result.data.forEach((movie) => {
            const mGenres = Array.isArray(movie.genre)
                ? movie.genre
                : movie.genre.split('/').map((g) => g.trim());
            const hasMatch = genres.some((g) => mGenres.includes(g));
            expect(hasMatch).toBe(true);
        });
    });

    it('should filter by a single year correctly', async () => {
        const year = 2024;
        const result = await getMovies(1, 10, '', 'latest', [], [year]);

        // Se ci sono film del 2024 nel mock, verifichiamo la corrispondenza
        if (result.data.length > 0) {
            result.data.forEach((movie) => {
                expect(movie.release_year.toString()).toBe(year.toString());
            });
        }
    });

    it('should filter by both genre and year (AND logic)', async () => {
        const genres = ['Sci-Fi'];
        const years = [2024];
        const result = await getMovies(1, 10, '', 'latest', genres, years);

        if (result.data.length > 0) {
            result.data.forEach((movie) => {
                expect(movie.genre).toContain(genres[0]);
                expect(movie.release_year.toString()).toBe(years[0].toString());
            });
        }
    });
});

describe('API Integration - getMovies pagination', () => {
    it('should return the correct number of items based on the limit', async () => {
        const limit = 5;
        const result = await getMovies(1, limit);

        expect(result.data.length).toBe(limit);
        expect(result).toHaveProperty('total');
    });

    it('should return the correct subset of items for a specific page', async () => {
        const limit = 2;
        // Recuperiamo prima tutti i film per avere un riferimento dell'ordine (default: latest)
        const allMovies = await getMovies(1, 10, '', 'latest');

        // Richiediamo la pagina 2 con limite 2
        const page2 = await getMovies(2, limit, '', 'latest');

        expect(page2.data.length).toBe(limit);
        // La pagina 2 con limite 2 deve contenere il 3° e il 4° elemento della lista totale
        expect(page2.data[0].id).toBe(allMovies.data[2].id);
        expect(page2.data[1].id).toBe(allMovies.data[3].id);
    });

    it('should return the total count of items available regardless of pagination', async () => {
        const resultPage1 = await getMovies(1, 2);
        const resultPage2 = await getMovies(2, 5);

        expect(resultPage1.total).toBe(resultPage2.total);
    });
});
