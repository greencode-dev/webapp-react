import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './MovieCard.module.css';
import MovieBadge from './MovieBadge';

const MovieCard = ({ movie, index }) => {
    const navigate = useNavigate();

    const handleNavigation = (e) => {
        // Implementazione della transizione di uscita (Cookbook 19)
        e.preventDefault();
        // Cerchiamo il container della pagina per applicare il fade-out
        const pageContainer = document.querySelector('.page-fade-in');
        if (pageContainer) {
            pageContainer.classList.add('page-fade-out');
        }
        setTimeout(() => {
            navigate(`/details/${movie.id}`);
        }, 400); // Match della durata CSS
    };

    return (
        <a
            href={`/details/${movie.id}`}
            onClick={handleNavigation}
            className={styles.cardLink}
            style={{ '--entry-index': index }}>
            <div className={styles.card}>
                <div className={styles.posterWrapper}>
                    {/* Nuovo Componente Badge gestito esternamente */}
                    <MovieBadge movie={movie} />

                    <img
                        src={movie.image}
                        alt={movie.title}
                        className={styles.poster}
                        loading="lazy"
                    />

                    <div className={styles.cyberOverlay}>
                        <div className={styles.scanLine}></div>
                        <span className={styles.ctaText} data-text="ACCEDI AI DETTAGLI">
                            ACCEDI AI DETTAGLI
                        </span>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{movie.title}</div>
                    <div className={styles.meta}>
                        <span className={styles.rating}>
                            <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                            {movie.average_vote ? movie.average_vote.toFixed(1) : '0.0'}
                        </span>
                        <span className={styles.year}>{movie.release_year}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default MovieCard;
