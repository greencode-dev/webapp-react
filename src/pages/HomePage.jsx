import Card from "../components/Card"
import { Row, Col } from "react-bootstrap"
import cards from "../data/cards"

function HomePage() {
    return (
        <div className="home-page">
            <h1 className="mb-4 text-primary fw-bold">Esplora i Contenuti</h1>
            <p className="lead mb-5 text-muted">
                Dalla teoria alla pratica: scopri le card interattive del tuo scaffold React.
            </p>

            <h2 className="mb-4 border-bottom pb-2">I nostri argomenti:</h2>
            <Row className="g-4">
                {cards.map(card => (
                    <Col key={card.id} md={6} lg={4}>
                        <Card card={card} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage