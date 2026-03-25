import { Card } from "react-bootstrap";

function ReviewCard({ review }) {
    if (!review) return null;

    const author = review.author || review.name || "Anonimo";
    const rating = review.rating || review.vote || 0;

    const renderStars = (starRating) => {
        return "⭐".repeat(starRating);
    }

    return (
        <Card className="glass-card mb-4 border-0 text-white">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                            {author.charAt(0).toUpperCase()}
                        </div>
                        <h6 className="fw-bold mb-0">{author}</h6>
                    </div>
                    <span className="small text-neon-secondary opacity-75">{renderStars(rating)}</span>
                </div>
                <p className="card-text text-light opacity-80 mb-0 font-italic" style={{ borderLeft: '3px solid var(--primary-neon)', paddingLeft: '1rem' }}>
                    "{review.text}"
                </p>
            </Card.Body>
        </Card>
    );
}

export default ReviewCard;
