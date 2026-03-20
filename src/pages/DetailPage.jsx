import { useParams, useNavigate } from "react-router-dom";
import cards from "../data/cards";
import { Button, Card, Container } from "react-bootstrap";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Trova la card corrispondente all'ID (convertendo l'id in numero)
    const card = cards.find(c => c.id === parseInt(id));

    if (!card) {
        return (
            <div className="text-center py-5">
                <h2>Ops! Card non trovata.</h2>
                <Button variant="primary" onClick={() => navigate("/")}>Torna alla Home</Button>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-primary py-5 text-center text-white">
                    <h1 className="display-4 fw-bold">{card.title}</h1>
                    <p className="lead">{card.subtitle}</p>
                </div>
                <Card.Body className="p-5">
                    <h3 className="mb-4">Descrizione Dettagliata</h3>
                    <p className="fs-5 text-muted mb-5" style={{ lineHeight: '1.8' }}>
                        {card.content} 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                            ← Torna indietro
                        </Button>
                        <Button variant="primary" onClick={() => navigate("/")}>
                            Home Page
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetailPage;
