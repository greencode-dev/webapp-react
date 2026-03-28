import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilm } from '@fortawesome/free-solid-svg-icons';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/details/${movie.id}`} className={styles.cardLink}>
            <div className={`card ${styles.movieCard}`}>
                <div className={styles.posterWrapper}>
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className={styles.poster}
                        loading="lazy"
                    />

                    <div className={styles.cyberOverlay}>
                        <div className={styles.scanLine}></div>
                        <span className={styles.ctaText} data-text="ACCEDI AI DATI">
                            ACCEDI AI DATI
                        </span>
                    </div>
                </div>

                <div className="card-body p-3">
                    <h5 className="text-neon-primary mb-2 text-truncate">{movie.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">
                            <FontAwesomeIcon icon={faFilm} className="me-1 text-neon-secondary" />
                            {movie.genre}
                        </span>
                        <span className="text-warning small">
                            <FontAwesomeIcon icon={faStar} className="me-1" />
                            {movie.average_vote?.toFixed(1) || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
