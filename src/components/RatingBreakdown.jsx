import React from 'react';
import styles from './RatingBreakdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingBreakdown = ({ reviews = [], selectedRating, onRatingClick }) => {
    const total = reviews.length;

    // Creiamo un array da 5 a 1 per mappare le righe
    const breakdown = [5, 4, 3, 2, 1].map((stars) => {
        const count = reviews.filter((r) => r.rating === stars).length;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return { stars, count, percentage };
    });

    return (
        <div className={`glass-card p-4 mb-4 ${styles.container}`}>
            <h5 className="text-neon-primary mb-3 text-uppercase ls-1 small fw-bold">Riepilogo</h5>
            {breakdown.map(({ stars, count, percentage }) => (
                <div
                    key={stars}
                    className={`d-flex align-items-center mb-2 ${styles.ratingRow} ${
                        selectedRating === stars ? styles.activeRow : ''
                    }`}
                    onClick={() => onRatingClick && onRatingClick(stars)}>
                    <div className={styles.starLabel}>
                        {stars}{' '}
                        <FontAwesomeIcon icon={faStar} className="ms-1 text-warning small" />
                    </div>
                    <div className={styles.progressTrack}>
                        <div className={styles.progressBar} style={{ width: `${percentage}%` }} />
                    </div>
                    <div className={styles.countLabel}>{count}</div>
                </div>
            ))}
        </div>
    );
};

export default RatingBreakdown;
