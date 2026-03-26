import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie } from '../services/api';
import useFetch from '../hooks/useFetch';
import ReviewCard from '../components/ReviewCard';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import ErrorDisplay from '../components/ErrorDisplay';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movie, loading, error, refetch: fetchMovie } = useFetch(getMovie, id);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <h2 className="text-neon-primary mb-4 mt-5">Caricamento in corso...</h2>
            </Container>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchMovie} />;
    }

    if (!movie) {
        return (
            <div className="text-center py-5">
                <h2>Ops! Film non trovato.</h2>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Torna alla Home
                </Button>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Card className="glass-card shadow-lg border-0 overflow-hidden mb-5">
                <Row className="g-0">
                    <Col md={4} className="p-4 d-flex align-items-center justify-content-center">
                        <div className="poster-detail overflow-hidden">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="img-fluid"
                                style={{ maxHeight: '500px', width: 'auto' }}
                            />
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-4 p-lg-5 h-100 d-flex flex-column">
                            <div className="mb-3 d-flex justify-content-between align-items-start flex-wrap gap-3">
                                <div>
                                    <span className="badge bg-primary px-3 py-2 mb-2">
                                        {movie.genre}
                                    </span>
                                    <h1 className="display-4 fw-bold mb-1 text-neon-primary">
                                        {movie.title}
                                    </h1>
                                    <p className="lead text-light opacity-75 mb-0">
                                        Regia di <strong>{movie.director}</strong> •{' '}
                                        {movie.release_year}
                                    </p>
                                </div>
                                {movie.average_vote != null &&
                                    !isNaN(parseFloat(movie.average_vote)) && (
                                        <div className="text-center bg-dark bg-opacity-50 px-4 py-3 rounded-4 border border-secondary shadow">
                                            <div className="d-flex align-items-baseline justify-content-center">
                                                <h2 className="text-neon-secondary fw-bold mb-0 me-1">
                                                    ⭐ {parseFloat(movie.average_vote).toFixed(1)}
                                                </h2>
                                                <span className="text-light opacity-50 fs-5">
                                                    / 5
                                                </span>
                                            </div>
                                            <small
                                                className="text-uppercase text-muted fw-bold mt-1 d-block"
                                                style={{
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '1px',
                                                }}>
                                                Voto Medio
                                            </small>
                                        </div>
                                    )}
                            </div>

                            <div className="flex-grow-1">
                                <h5 className="fw-bold text-uppercase text-neon-secondary small mb-3">
                                    Trama
                                </h5>
                                <p
                                    className="fs-5 text-light opacity-80 mb-5"
                                    style={{ lineHeight: '1.8' }}>
                                    {movie.abstract}
                                </p>
                            </div>

                            <div className="mt-auto text-end">
                                <Button
                                    variant="outline-secondary"
                                    className="px-4"
                                    onClick={() => navigate(-1)}>
                                    ← Torna indietro
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <div className="reviews-section">
                <h3 className="mb-4 fw-bold text-neon-primary">Recensioni degli utenti</h3>
                {movie.reviews && movie.reviews.length > 0 ? (
                    <Row>
                        {movie.reviews.map((review) => (
                            <Col key={review.id} md={6}>
                                <ReviewCard review={review} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-muted italic">Ancora nessuna recensione per questo film.</p>
                )}
            </div>
        </Container>
    );
}

export default DetailPage;
