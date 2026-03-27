import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container text-center">
                <div className={styles.brandText}>
                    <p className="mb-0 text-neon-primary">
                        © 2026 <span className="text-neon-secondary">CineLab</span> - Creato con
                        amore
                    </p>
                </div>

                <div className="d-flex justify-content-center gap-4 my-4">
                    <a href="#" className={styles.socialLink} aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="X (Twitter)">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="YouTube">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>

                <small className="text-muted opacity-75">Il cinema a portata di click</small>
            </div>
        </footer>
    );
}

export default Footer;
