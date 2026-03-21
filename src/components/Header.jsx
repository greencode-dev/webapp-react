import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-neon.png';

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top me-2 rounded"
                            alt="CineLab Logo"
                            style={{ boxShadow: '0 0 15px var(--primary-glow)' }}
                        />
                        <span className="text-gradient fs-3">CineLab</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/" end className="px-3">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about" className="px-3">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header