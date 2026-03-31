import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewItem.module.css';

/**
 * ReviewItem Component
 * Visualizza una singola recensione con animazione di entrata e formattazione data localizzata.
 */
const ReviewItem = ({ review, index, onDelete }) => {
    // Gestione della formattazione della data in formato locale (it-IT)
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Data non disponibile';

        // Gestisce sia stringhe ISO che timestamp numerici (usati nel mock come ID)
        const date = new Date(timestamp);

        return new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className={styles.reviewCard} style={{ '--index': index }}>
            <div className={styles.reviewHeader}>
                <div className={styles.authorInfo}>
                    <div className={styles.avatar}>
                        <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                    <div className={styles.meta}>
                        <span className={styles.authorName}>{review.author}</span>
                        <span className={styles.date}>
                            {formatDate(review.created_at || review.id)}
                        </span>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <div className={styles.ratingStars}>
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={
                                    i < review.rating ? styles.starActive : styles.starInactive
                                }
                            />
                        ))}
                    </div>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete?.(review.id)}
                        title="Elimina recensione">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

            <div className={styles.reviewBody}>
                <p className={styles.commentText}>{review.text}</p>
            </div>
        </div>
    );
};

export default ReviewItem;
