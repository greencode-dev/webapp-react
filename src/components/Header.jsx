import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-neon.png';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
            <Navbar expand="lg" className={styles.headerNavbar}>
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className={styles.brand}>
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className={styles.logoImg}
                            alt="CineLab Logo"
                        />
                        <span className="text-gradient fs-3">CineLab</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={styles.navCollapse}>
                        <Nav>
                            <Nav.Link as={NavLink} to="/" end>
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/about">
                                About
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
