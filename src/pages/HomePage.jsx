import { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { Container, Pagination } from 'react-bootstrap';
import { getMovies } from '../api/api';
import useFetch from '../hooks/useFetch';
import ErrorDisplay from '../components/ErrorDisplay';
import SearchBar from '../components/SearchBar';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import SortSelector from '../components/SortSelector';
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar';
import moviesData from '../data/cards'; // Per estrarre gli anni disponibili
import styles from './HomePage.module.css';

// Setup dati per la Sidebar (definiti fuori per stabilità e per evitare ReferenceError)
const AVAILABLE_GENRES = ['Sci-Fi', 'Action', 'Drama', 'Crime', 'Romance'];
const AVAILABLE_YEARS = [...new Set(moviesData.map((m) => m.release_year))].sort((a, b) => b - a);

function HomePage() {
    const [searchTerm, setSearchTerm] = useState(''); // Nuovo stato per il termine di ricerca
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina corrente
    const [sortBy, setSortBy] = useState('latest'); // Stato per l'ordinamento
    const [selectedGenres, setSelectedGenres] = useState([]); // Filtri categoria
    const [selectedYear, setSelectedYear] = useState(''); // Filtro anno

    // Impostiamo 12 film per pagina per riempire bene la griglia ad alta densità
    const moviesPerPage = 12;

    // Debounce: aggiorna debouncedSearch dopo 500ms di inattività nell'input
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Richiediamo i dati passando i parametri di paginazione e ricerca
    const {
        data,
        loading,
        error,
        refetch: fetchMovies,
    } = useFetch(getMovies, [
        currentPage,
        moviesPerPage,
        debouncedSearch,
        sortBy,
        selectedGenres,
        selectedYear,
    ]);

    // I dati ora arrivano già filtrati e paginati dal server
    const moviesList = data?.data || [];
    const totalPages = data ? Math.ceil(data.total / moviesPerPage) : 0;

    // Calcolo dinamico dei contatori generi basato sui risultati attuali
    const genreCounts = useMemo(() => {
        return AVAILABLE_GENRES.reduce((acc, genre) => {
            acc[genre] = moviesList.filter((m) => m.genre.includes(genre)).length;
            return acc;
        }, {});
    }, [moviesList]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset alla prima pagina durante la ricerca
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handleGenreToggle = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
        );
        setCurrentPage(1);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSelectedGenres([]);
        setSelectedYear('');
        setCurrentPage(1);
    };

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchMovies} />;
    }

    return (
        <Container className="py-5 page-fade-in">
            <div className={`${styles.heroSection} ${styles.heroTextAnimate}`}>
                <h1
                    className={`display-4 mb-4 text-neon-primary fw-bold ${styles.glitchTitle}`}
                    data-text="Scopri il Cinema con CineLab">
                    Scopri il Cinema con{' '}
                    <span className="text-neon-secondary neon-pulse">CineLab</span>
                </h1>
                <p className="lead mb-5 text-neon-primary opacity-75">
                    Esplora la nostra selezione esclusiva di capolavori del cinema.
                </p>
            </div>

            {/* Campo di ricerca */}
            <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cerca un film per titolo o genere..."
                loading={loading}
            />

            {/* Neon Search Progress Indicator */}
            <div className={`${styles.searchProgressContainer} ${loading ? styles.visible : ''}`}>
                <div className={styles.searchProgressBar}></div>
            </div>

            <div className={styles.sectionHeader}>
                <h2 className="text-neon-primary mb-3 mb-md-0">I film in evidenza</h2>

                <SortSelector value={sortBy} onChange={handleSortChange} />
            </div>

            <div className={styles.mainLayout}>
                <Sidebar
                    availableGenres={AVAILABLE_GENRES}
                    selectedGenres={selectedGenres}
                    onGenreToggle={handleGenreToggle}
                    availableYears={AVAILABLE_YEARS}
                    selectedYear={selectedYear}
                    onYearChange={handleYearChange}
                    onReset={handleResetFilters}
                    genreCounts={genreCounts}
                />

                <div className={styles.gridContent}>
                    <div
                        className={`${styles.movieGrid} ${styles.resultsTransition} ${loading ? styles.resultsLoading : ''}`}>
                        {loading ? (
                            [...Array(6)].map((_, index) => (
                                <div key={index} className={styles.movieCardAppearance}>
                                    <MovieCardSkeleton />
                                </div>
                            ))
                        ) : moviesList.length > 0 ? (
                            moviesList.map((movie, index) => (
                                <div
                                    key={movie.id}
                                    className={styles.movieCardAppearance}
                                    style={{ '--entry-index': index }}>
                                    <MovieCard movie={movie} index={index} />
                                </div>
                            ))
                        ) : (
                            <div className="w-100 text-center py-5">
                                <p className="text-muted">
                                    Nessun film trovato con i filtri selezionati.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Paginazione interna al contenuto griglia */}
                    {!loading && totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination>
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </Pagination>
                        </div>
                    )}
                </div>
            </div>

            <ScrollToTop />
        </Container>
    );
}

export default HomePage;
