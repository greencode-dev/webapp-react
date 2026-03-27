import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import { getMovie } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import RatingBreakdown from '../components/RatingBreakdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarAlt, faFilm, faUserTie } from '@fortawesome/free-solid-svg-icons';

const DetailPage = () => {
    const { id } = useParams();
    const [filterRating, setFilterRating] = useState(null);

    // Pattern Milestone 3: uso di refetch per ricaricare i dati dopo l'invio della recensione
    const { data: movie, loading, error, refetch } = useFetch(getMovie, id);

    // Calcolo della media voti in tempo reale basato sulle recensioni caricate
    const averageVote = useMemo(() => {
        if (!movie?.reviews || movie.reviews.length === 0) return 0;

        const sum = movie.reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / movie.reviews.length;
    }, [movie?.reviews]);

    // Filtriamo le recensioni in base alle stelle selezionate
    const filteredReviews = useMemo(() => {
        if (!movie?.reviews) return [];
        if (!filterRating) return movie.reviews;
        return movie.reviews.filter((r) => r.rating === filterRating);
    }, [movie?.reviews, filterRating]);

    // Funzione per attivare/disattivare il filtro
    const handleFilterClick = (stars) => {
        setFilterRating((prev) => (prev === stars ? null : stars));
    };

    if (loading)
        return (
            <div className="p-5 text-center text-neon-primary">
                Inizializzazione scansione olografica...
            </div>
        );
    if (error) return <div className="p-5 text-center text-danger">Errore di sistema: {error}</div>;
    if (!movie) return <div className="p-5 text-center">Film non trovato nel database.</div>;

    return (
        <Container className="py-5">
            <Row
                className="mb-5 align-items-center movie-card-appearance"
                style={{ '--entry-index': 1 }}>
                <Col lg={4} className="mb-4 mb-lg-0">
                    <div
                        className="poster-wrapper rounded-4 overflow-hidden border border-info shadow-lg"
                        style={{ boxShadow: '0 0 25px var(--primary-glow)' }}>
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="img-fluid w-100 object-fit-cover"
                        />
                    </div>
                </Col>
                <Col lg={8} className="movie-card-appearance" style={{ '--entry-index': 2 }}>
                    <h1 className="glitch-title mb-3" data-text={movie.title}>
                        {movie.title}
                    </h1>

                    <div className="d-flex flex-wrap gap-3 mb-4">
                        <Badge bg="dark" className="border border-info text-info p-2">
                            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />{' '}
                            {movie.release_year}
                        </Badge>
                        <Badge bg="dark" className="border border-warning text-warning p-2">
                            <FontAwesomeIcon icon={faStar} className="me-2" />{' '}
                            {averageVote > 0 ? averageVote.toFixed(1) : 'N/A'}
                        </Badge>
                        <Badge bg="dark" className="border border-primary text-primary p-2">
                            <FontAwesomeIcon icon={faFilm} className="me-2" /> {movie.genre}
                        </Badge>
                    </div>

                    <div className="glass-card p-4 mb-4">
                        <h4 className="text-neon-primary mb-3">Sintesi Trama</h4>
                        <p className="lead opacity-75">{movie.abstract}</p>
                    </div>

                    <Row>
                        <Col sm={6} className="mb-3">
                            <h6 className="text-neon-secondary text-uppercase small ls-2">
                                Direzione
                            </h6>
                            <p className="mb-0">
                                <FontAwesomeIcon icon={faUserTie} className="me-2 opacity-50" />
                                {movie.director}
                            </p>
                        </Col>
                        <Col sm={6}>
                            <h6 className="text-neon-secondary text-uppercase small ls-2">
                                Cast Principale
                            </h6>
                            <p className="mb-0 small">{movie.actors?.join(', ')}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <hr className="my-5 border-secondary opacity-25" />

            <Row className="movie-card-appearance" style={{ '--entry-index': 3 }}>
                <Col lg={7} className="mb-5 mb-lg-0">
                    <h3 className="text-neon-primary mb-4">
                        Recensioni{' '}
                        <small className="text-muted fs-6">({movie.reviews?.length || 0})</small>
                    </h3>

                    {/* Visualizzazione della distribuzione voti */}
                    <RatingBreakdown
                        reviews={movie.reviews}
                        selectedRating={filterRating}
                        onRatingClick={handleFilterClick}
                    />

                    {filterRating && (
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <span className="text-muted small">
                                Filtro attivo: <strong>{filterRating} stelle</strong>
                            </span>
                            <button
                                className="btn btn-link btn-sm text-neon-primary p-0 text-decoration-none"
                                onClick={() => setFilterRating(null)}>
                                Rimuovi filtro
                            </button>
                        </div>
                    )}

                    {filteredReviews.length > 0 ? (
                        <div className="d-flex flex-column gap-3">
                            {filteredReviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : filterRating ? (
                        <div className="glass-card p-4 text-center opacity-50">
                            Nessuna recensione con {filterRating} stelle trovata.
                        </div>
                    ) : (
                        <div className="glass-card p-5 text-center opacity-50 border-dashed">
                            Nessuna trasmissione ricevuta. Lascia la prima recensione!
                        </div>
                    )}
                </Col>

                <Col lg={5}>
                    {/* 
                        Milestone 3: Passiamo la funzione refetch come callback.
                        ReviewForm la chiamerà dopo l'invio riuscito per aggiornare 
                        la lista recensioni e la media voti.
                    */}
                    <ReviewForm movieId={id} onReviewSuccess={refetch} />
                </Col>
            </Row>
        </Container>
    );
};

export default DetailPage;
