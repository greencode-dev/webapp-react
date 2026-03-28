import styles from './MovieBadge.module.css'; // Verifica puntamento locale in src/components/

const MovieBadge = ({ movie }) => {
    const currentYear = new Date().getFullYear();
    const isNew = movie.release_year >= currentYear - 1;
    const isHot = movie.average_vote >= 4.9 && !isNew;

    if (!isNew && !isHot) return null;

    return (
        <div className={styles.statusTags}>
            {isNew && <span className={styles.badgeNew}>NEW</span>}
            {isHot && <span className={styles.badgeHot}>HOT</span>}
        </div>
    );
};

export default MovieBadge;
