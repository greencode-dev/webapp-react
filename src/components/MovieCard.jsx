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

    const maxTilt = 10; // Gradi massimi di inclinazione

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calcola i valori di inclinazione, invertendo l'asse Y per un effetto più naturale
        const rotateY = ((mouseX - centerX) / centerX) * maxTilt;
        const rotateX = -((mouseY - centerY) / centerY) * maxTilt;

        card.style.setProperty('--mouse-x', `${mouseX}px`); // Per l'effetto spotlight
        card.style.setProperty('--mouse-y', `${mouseY}px`); // Per l'effetto spotlight
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--mouse-x', `0px`); // Reset spotlight
        card.style.setProperty('--mouse-y', `0px`); // Reset spotlight
        card.style.setProperty('--rotate-x', `0deg`); // Reset tilt
        card.style.setProperty('--rotate-y', `0deg`); // Reset tilt
    };

    return (
        <div
            className={styles.glassCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
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
