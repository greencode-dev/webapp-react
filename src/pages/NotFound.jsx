import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

function NotFound() {
    return (
        <Container className="text-center py-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="fs-3"> <span className="text-danger">Oops!</span> Pagina non trovata.</p>
            <p className="lead">
                La pagina che stai cercando non esiste.
            </p>
            <Link to="/" className="btn btn-primary">Torna alla Home</Link>
        </Container>
    )
}

export default NotFound
