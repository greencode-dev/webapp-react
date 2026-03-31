import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faStar,
    faCalendarAlt,
    faUserTie,
    faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { getMovie, deleteReview } from '../api/api';
import ReviewForm from '../components/ReviewForm';
import ReviewItem from '../components/ReviewItem';
import ErrorDisplay from '../components/ErrorDisplay';
import styles from './DetailPage.module.css';

const DetailPage = () => {
    const { id } = useParams();

    // Recupero dei dati del film tramite l'hook custom
    const { data: movie, loading, error, refetch } = useFetch(getMovie, [id]);

    // Calcolo della distribuzione dei voti (1-5 stelle)
    const ratingStats = useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (!movie?.reviews || movie.reviews.length === 0) return counts;

        movie.reviews.forEach((rev) => {
            if (counts[rev.rating] !== undefined) {
                counts[rev.rating]++;
            }
        });
        return counts;
    }, [movie?.reviews]);

    const totalReviews = movie?.reviews?.length || 0;

    const handleDeleteReview = async (reviewId) => {
        // Feedback utente prima dell'eliminazione
        if (window.confirm('Attenzione: procedere con la disconnessione di questa trasmissione?')) {
            try {
                await deleteReview(id, reviewId);
                // Aggiorniamo la lista tramite refetch per riflettere l'eliminazione
                refetch();
            } catch (err) {
                console.error('Errore durante la disattivazione del segnale:', err);
            }
        }
    };

    if (error) return <ErrorDisplay message={error} onRetry={refetch} />;

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <div className="text-neon-primary fw-bold">
                    SINCRONIZZAZIONE DATI OLOGRAFICI IN CORSO...
                </div>
            </Container>
        );
    }

    if (!movie) return null;

    return (
        <Container className="py-5 page-fade-in">
            {/* Link di ritorno con stile Cyber */}
            <Link to="/" className={styles.backLink}>
                <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                Torna alla Dashboard
            </Link>

            <Row className="mb-5 mt-4">
                <Col lg={4} className="mb-4 mb-lg-0">
                    <div className={styles.posterContainer}>
                        <img src={movie.image} alt={movie.title} className={styles.poster} />
                        <div className={styles.glitchOverlay}></div>
                    </div>
                </Col>
                <Col lg={8}>
                    <div className={styles.infoWrapper}>
                        <h1 className={styles.movieTitle}>{movie.title}</h1>

                        <div className={styles.badgeList}>
                            <Badge className={styles.ratingBadge}>
                                <FontAwesomeIcon icon={faStar} className="me-1" />
                                {movie.average_vote?.toFixed(1) || '0.0'}
                            </Badge>
                            {(Array.isArray(movie.genre)
                                ? movie.genre
                                : movie.genre?.split('/').map((g) => g.trim()) || []
                            ).map((g) => (
                                <Badge key={g} className={styles.genreBadge}>
                                    {g}
                                </Badge>
                            ))}
                        </div>

                        <div className={styles.metaInfo}>
                            <p>
                                <FontAwesomeIcon
                                    icon={faUserTie}
                                    className="me-2 text-neon-primary"
                                />{' '}
                                Regia: <strong>{movie.director}</strong>
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="me-2 text-neon-primary"
                                />{' '}
                                Anno: <strong>{movie.release_year}</strong>
                            </p>
                        </div>

                        {/* Grafico Distribuzione Voti Olografico */}
                        <div className={styles.statsContainer}>
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratingStats[star];
                                const percentage =
                                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                return (
                                    <div key={star} className={styles.statRow}>
                                        <div className={styles.starLabel}>
                                            {star}{' '}
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={styles.tinyStar}
                                            />
                                        </div>
                                        <div className={styles.barContainer}>
                                            <div
                                                className={styles.barFill}
                                                style={{
                                                    '--percent': `${percentage}%`,
                                                    '--delay': `${(5 - star) * 0.1}s`,
                                                }}></div>
                                        </div>
                                        <div className={styles.percentLabel}>
                                            {Math.round(percentage)}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.abstractSection}>
                            <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
                            <p className={styles.abstractText}>{movie.abstract}</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <hr className={styles.cyberDivider} />

            <Row className="mt-5 g-5">
                <Col lg={5}>
                    <ReviewForm movieId={id} onReviewSuccess={refetch} />
                </Col>
                <Col lg={7}>
                    <h3 className="text-neon-primary mb-4 h4 text-uppercase fw-bold">
                        Trasmissioni Community
                    </h3>
                    <div className={styles.reviewsContainer}>
                        {movie.reviews && movie.reviews.length > 0 ? (
                            movie.reviews.map((review, index) => (
                                <ReviewItem
                                    key={review.id || index}
                                    review={review}
                                    index={index}
                                    onDelete={handleDeleteReview}
                                />
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                Nessuna recensione rilevata nel settore.
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DetailPage;
