import Card from "../components/Card"
import { Row, Col } from "react-bootstrap"
import cards from "../data/cards"

function AboutPage() {
    // Prendiamo solo le prime 2 card per la pagina About come esempio
    const featuredCards = cards.slice(0, 2);

    return (
        <div className="about-page">
            <h1 className="mb-4 text-info fw-bold">Chi Siamo</h1>
            <p className="lead mb-5">
                Siamo un team dedicato alla creazione di template moderni e funzionali per sviluppatori React. 
                Utilizziamo le migliori tecnologie per garantirti il massimo della produttività.
            </p>

            <h2 className="mb-4 border-bottom pb-2">Temi in primo piano:</h2>
            <Row className="g-4">
                {featuredCards.map(card => (
                    <Col key={card.id} md={6}>
                        <Card card={card} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default AboutPage