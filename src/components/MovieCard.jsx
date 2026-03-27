import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
    if (!movie) return null;

    // Controlli di sicurezza per le proprietà essenziali
    const safeMovie = {
        id: movie.id || 0,
        title: movie.title || 'Titolo sconosciuto',
        image: movie.image || '/placeholder.jpg',
        director: movie.director || 'Regista sconosciuto',
        release_year: movie.release_year || '????',
        genre: movie.genre || 'Genere sconosciuto',
        abstract: movie.abstract || 'Descrizione non disponibile',
    };

    return (
        <div className={styles.glassCard}>
            <div className={styles.posterWrapper}>
                <img src={safeMovie.image} className={styles.posterImg} alt={safeMovie.title} />
                <div className={styles.posterOverlay}></div>
            </div>
            <div className={styles.cardBody}>
                <h5
                    className={`card-title fw-bold text-neon-primary ${styles.cardGlitchText}`}
                    data-text={safeMovie.title}>
                    {safeMovie.title}
                </h5>
                <h6 className={styles.subtitle}>
                    {safeMovie.director} ({safeMovie.release_year})
                </h6>
                <p className={`${styles.abstract} text-truncate-3`}>{safeMovie.abstract}</p>
                <div className={styles.footer}>
                    <span className={styles.genreBadge}>{safeMovie.genre}</span>
                    <Link to={`/details/${safeMovie.id}`} className="btn btn-primary btn-sm px-4">
                        Dettagli
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
