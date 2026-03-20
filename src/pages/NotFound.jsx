import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="text-center py-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Pagina non trovata.</p>
            <p className="lead">
                La pagina che stai cercando non esiste.
            </p>
            <Link to="/" className="btn btn-primary">Torna alla Home</Link>
        </div>
    )
}

export default NotFound
