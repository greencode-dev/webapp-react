import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Row, Col, Container, Pagination } from 'react-bootstrap';
import { getMovies } from '../services/api';
import useFetch from '../hooks/useFetch';
import ErrorDisplay from '../components/ErrorDisplay';
import SearchBar from '../components/SearchBar';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import SortSelector from '../components/SortSelector';
import styles from './HomePage.module.css';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState(''); // Nuovo stato per il termine di ricerca
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina corrente
    const [sortBy, setSortBy] = useState('latest'); // Stato per l'ordinamento
    const moviesPerPage = 3; // Numero di film da mostrare per pagina

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
    } = useFetch(getMovies, [currentPage, moviesPerPage, debouncedSearch, sortBy]);

    // I dati ora arrivano già filtrati e paginati dal server
    const moviesList = data?.data || [];
    const totalPages = data ? Math.ceil(data.total / moviesPerPage) : 0;

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

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchMovies} />;
    }

    return (
        <Container className="py-5">
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

            <Row
                className={`g-4 ${styles.movieGrid} ${styles.resultsTransition} ${loading ? styles.resultsLoading : ''}`}>
                {loading ? (
                    // Mostriamo 3 skeleton durante il caricamento
                    [...Array(moviesPerPage)].map((_, index) => (
                        <Col key={index} md={6} lg={4}>
                            <MovieCardSkeleton />
                        </Col>
                    ))
                ) : moviesList.length > 0 ? (
                    moviesList.map((movie, index) => (
                        <Col
                            key={movie.id}
                            md={6}
                            lg={4}
                            className={styles.movieCardAppearance}
                            style={{ '--entry-index': index }}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-muted text-center">
                            Nessun film trovato con il termine "{debouncedSearch}".
                        </p>
                    </Col>
                )}
            </Row>

            {/* Paginazione */}
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
        </Container>
    );
}

export default HomePage;
