import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    if (!movie) return null;

    return (
        <div className="card glass-card h-100 border-0 overflow-hidden">
            <div className="poster-wrapper">
                <img 
                    src={movie.image} 
                    className="poster-img" 
                    alt={movie.title} 
                />
                <div className="poster-overlay"></div>
            </div>
            <div className="card-body d-flex flex-column bg-transparent">
                <h5 className="card-title fw-bold text-neon-primary">{movie.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted opacity-75">{movie.director} ({movie.release_year})</h6>
                <p className="card-text text-truncate-3 flex-grow-1 text-secondary">
                    {movie.abstract}
                </p>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                    <span className="badge bg-info text-dark">{movie.genre}</span>
                    <Link to={`/details/${movie.id}`} className="btn btn-primary btn-sm px-4">
                        Dettagli
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
