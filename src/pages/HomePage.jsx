import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { getMovies } from '../services/api';
import useFetch from '../hooks/useFetch';
import ErrorDisplay from '../components/ErrorDisplay';

function HomePage() {
    const { data: movies, loading, error, refetch: fetchMovies } = useFetch(getMovies);

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

            <h2 className="mb-4 text-neon-primary border-bottom border-secondary pb-3">
                I film in evidenza
            </h2>
            <Row className="g-4">
                {movies &&
                    movies.map((movie) => (
                        <Col key={movie.id} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}

export default HomePage;
