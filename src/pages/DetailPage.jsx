import { useParams, useNavigate } from 'react-router-dom';
import { getMovie } from '../services/api';
import useFetch from '../hooks/useFetch';
import ReviewCard from '../components/ReviewCard';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ErrorDisplay from '../components/ErrorDisplay';
import MovieDetailSkeleton from '../components/MovieDetailSkeleton';
import styles from './DetailPage.module.css';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movie, loading, error, refetch: fetchMovie } = useFetch(getMovie, [id]);

    if (loading) return <MovieDetailSkeleton />;

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
            <Card className={`${styles.detailCard} shadow-lg border-0 overflow-hidden mb-5`}>
                <Row className="g-0">
                    <Col md={4} className={styles.posterColumn}>
                        <div className={styles.posterWrapper}>
                            <img src={movie.image} alt={movie.title} className={styles.posterImg} />
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className={styles.infoBody}>
                            <div className={styles.headerRow}>
                                <div>
                                    <span className={`${styles.genreBadge} badge mb-2`}>
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
                                        <div className={styles.voteContainer}>
                                            <div className="d-flex align-items-baseline justify-content-center">
                                                <h2 className="text-neon-secondary fw-bold mb-0 me-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className="me-2"
                                                    />
                                                    {parseFloat(movie.average_vote).toFixed(1)}
                                                </h2>
                                                <span className="text-light opacity-50 fs-5">
                                                    / 5
                                                </span>
                                            </div>
                                            <small className={styles.voteLabel}>Voto Medio</small>
                                        </div>
                                    )}
                            </div>

                            <div className="flex-grow-1">
                                <h5 className="fw-bold text-uppercase text-neon-secondary small mb-3">
                                    Trama
                                </h5>
                                <p className={styles.abstractText}>{movie.abstract}</p>
                            </div>

                            <div className="mt-auto text-end">
                                <Button
                                    variant="outline-secondary"
                                    className="px-4"
                                    onClick={() => navigate(-1)}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Torna
                                    indietro
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
