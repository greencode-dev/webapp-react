import { useState } from 'react'; // useEffect non è più necessario qui
import MovieCard from '../components/MovieCard';
import { Row, Col, Container, Spinner, Form, Pagination } from 'react-bootstrap'; // Importa Form e Pagination
import { getMovies } from '../services/api';
import useFetch from '../hooks/useFetch';
import ErrorDisplay from '../components/ErrorDisplay';

function HomePage() {
    const { data: movies, loading, error, refetch: fetchMovies } = useFetch(getMovies);
    const [searchTerm, setSearchTerm] = useState(''); // Nuovo stato per il termine di ricerca
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina corrente
    const moviesPerPage = 3; // Numero di film da mostrare per pagina

    // Logica di filtro dei film
    const filteredMovies =
        movies?.filter(
            (movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.abstract.toLowerCase().includes(searchTerm.toLowerCase()),
        ) || [];

    // Logica di paginazione
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset alla prima pagina durante la ricerca
    };

    if (loading) {
        return (
            <Container className="py-5">
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Container>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchMovies} />;
    }

    // if (error) {
    //     return (
    //         <Container className="py-5">
    //             <div className="text-center py-5 text-danger">
    //                 <h2>{error}</h2>
    //                 <button className="btn btn-primary mt-3" onClick={fetchMovies}>
    //                     Riprova
    //                 </button>
    //             </div>
    //         </Container>
    //     );
    // }

    return (
        <Container className="py-5">
            <div className="text-center mb-5 hero-text-animate">
                <h1 className="display-4 mb-4 text-neon-primary fw-bold">
                    Scopri il Cinema con <span className="text-neon-secondary">CineLab</span>
                </h1>
                <p className="lead mb-5 text-neon-primary opacity-75">
                    Esplora la nostra selezione esclusiva di capolavori del cinema.
                </p>
            </div>

            {/* Campo di ricerca */}
            <div className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Cerca un film per titolo o trama..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-dark text-white border-secondary"
                    style={{
                        '--bs-bg-opacity': '.5',
                        '--bs-border-opacity': '.5',
                        '--bs-focus-ring-color': 'rgba(0, 210, 255, .25)',
                        '--bs-form-control-color': 'var(--bs-white)',
                        '--bs-form-control-bg': 'var(--bs-dark)',
                        '--bs-form-control-border-color': 'var(--bs-secondary)',
                        '--bs-form-control-focus-border-color': 'var(--primary-neon)',
                        '--bs-form-control-placeholder-color': 'rgba(255, 255, 255, .5)',
                    }}
                />
            </div>

            <h2 className="mb-4 text-neon-primary border-bottom border-secondary pb-3">
                I film in evidenza
            </h2>
            <Row className="g-4">
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie) => (
                        <Col key={movie.id} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-muted text-center">
                            Nessun film trovato con il termine "{searchTerm}".
                        </p>
                    </Col>
                )}
            </Row>

            {/* Paginazione */}
            {totalPages > 1 && (
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
