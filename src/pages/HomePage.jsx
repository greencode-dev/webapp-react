import MovieCard from "../components/MovieCard"
import { Row, Col, Container } from "react-bootstrap"
import movies from "../data/cards"

function HomePage() {
    return (
        <Container className="py-5">
            <div className="text-center mb-5 hero-text-animate">
                <h1 className="display-4 mb-4 text-neon-primary fw-bold">Scopri il Cinema con <span className="text-neon-secondary">CineLab</span></h1>
                <p className="lead mb-5 text-neon-primary opacity-75">
                    Esplora la nostra selezione esclusiva di capolavori del cinema.
                </p>
            </div>

            <h2 className="mb-4 text-neon-primary border-bottom border-secondary pb-3">I film in evidenza</h2>
            <Row className="g-4">
                {movies.map(movie => (
                    <Col key={movie.id} md={6} lg={4}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomePage