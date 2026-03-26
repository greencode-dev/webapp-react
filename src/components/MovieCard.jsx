import { Link } from 'react-router-dom';

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
        <div className="card glass-card h-100 border-0 overflow-hidden">
            <div className="poster-wrapper">
                <img src={safeMovie.image} className="poster-img" alt={safeMovie.title} />
                <div className="poster-overlay"></div>
            </div>
            <div className="card-body d-flex flex-column bg-transparent">
                <h5
                    className="card-title fw-bold text-neon-primary card-glitch-text"
                    data-text={safeMovie.title}>
                    {safeMovie.title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted opacity-75">
                    {safeMovie.director} ({safeMovie.release_year})
                </h6>
                <p className="card-text text-truncate-3 flex-grow-1 text-secondary">
                    {safeMovie.abstract}
                </p>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                    <span className="badge bg-info text-dark">{safeMovie.genre}</span>
                    <Link to={`/details/${safeMovie.id}`} className="btn btn-primary btn-sm px-4">
                        Dettagli
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
