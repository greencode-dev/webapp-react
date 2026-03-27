import styles from './ReviewCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ review }) => {
    const { author, rating, text } = review;

    return (
        <div className={`glass-card p-3 ${styles.reviewCard}`}>
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                    <div className={styles.avatarWrapper}>
                        <FontAwesomeIcon icon={faUserCircle} className={styles.avatarIcon} />
                    </div>
                    <h6 className="mb-0 ms-2 text-neon-secondary text-uppercase ls-1">{author}</h6>
                </div>

                <div className={styles.starsWrapper}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={i < rating ? styles.starFilled : styles.starEmpty}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                <p className="mb-0 opacity-75 italic">
                    <span className={styles.quote}>"</span>
                    {text}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;
