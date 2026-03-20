import { Link } from "react-router-dom";

function Card({ card }) {
    if (!card) return null;

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
                <p className="card-text text-truncate-3 flex-grow-1">
                    {card.content}
                </p>
                <Link to={`/details/${card.id}`} className="btn btn-primary btn-sm mt-3">
                    Dettagli
                </Link>
            </div>
        </div>
    )
}

export default Card;
