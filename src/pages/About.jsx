import MovieCard from "../components/MovieCard"
import { Row, Col } from "react-bootstrap"
import movies from "../data/cards"

function AboutPage() {
    const featuredMovies = movies.slice(0, 3);

    return (
        <div className="about-page pb-5">
            {/* Hero Section */}
            <header className="about-hero mb-5 px-3">
                <div className="hero-content">
                    <h1 className="display-2 fw-bold mb-3 text-neon-primary">Cine<span className="text-neon-secondary font-weight-bold">Lab</span></h1>
                    <p className="fs-3 mb-0 text-neon-primary opacity-90">
                        Sperimenta la magia del cinema.
                    </p>
                </div>
            </header>

            {/* Mission Section */}
            <section className="container mb-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <h2 className="display-4 fw-bold mb-4 text-neon-primary">La Nostra Missione</h2>
                        <p className="lead text-light mb-4">
                            CineLab nasce dalla passione per il racconto cinematografico. Il nostro obiettivo è creare un ecosistema dove gli appassionati possano scoprire nuovi capolavori, condividere opinioni sincere e approfondire la conoscenza della settima arte.
                        </p>
                        <p className="text-secondary">
                            Ogni film è una finestra su un mondo diverso. Noi ti forniamo gli strumenti per aprirle tutte, con una libreria in costante espansione e una comunità vibrante.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <div className="row g-4">
                            <div className="col-sm-6">
                                <div className="glass-card shadow-sm text-center">
                                    <h3 className="h1 fw-bold text-primary mb-2">500+</h3>
                                    <p className="text-muted mb-0">Film in Database</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="glass-card shadow-sm text-center">
                                    <h3 className="h1 fw-bold text-info mb-2">10k+</h3>
                                    <p className="text-muted mb-0">Recensioni</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="glass-card shadow-sm text-center">
                                    <h3 className="h1 fw-bold text-success mb-2">24/7</h3>
                                    <p className="text-muted mb-0">Aggiornamenti</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="glass-card shadow-sm text-center">
                                    <h3 className="h1 fw-bold text-warning mb-2">4.9</h3>
                                    <p className="text-muted mb-0">Rating Utenti</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="container">
                <h2 className="display-6 fw-bold mb-5 text-center">Per iniziare la tua ricerca...</h2>
                <Row className="g-4">
                    {featuredMovies.map(movie => (
                        <Col key={movie.id} lg={4} md={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    )
}

export default AboutPage