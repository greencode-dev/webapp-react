import { Card } from 'react-bootstrap';
import styles from './ReviewCard.module.css';

function ReviewCard({ review }) {
    if (!review) return null;

    const author = review.author || review.name || 'Anonimo';
    const rating = review.rating || review.vote || 0;

    const renderStars = (starRating) => {
        return '⭐'.repeat(Math.round(starRating));
    };

    return (
        <Card className={`${styles.reviewCard} mb-4 border-0 text-white`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className={styles.avatar}>{author.charAt(0).toUpperCase()}</div>
                        <h6 className={`${styles.author} mb-0`}>{author}</h6>
                    </div>
                    <span className={styles.ratingStars}>{renderStars(rating)}</span>
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
            </Card.Body>
        </Card>
    );
}

export default ReviewCard;
