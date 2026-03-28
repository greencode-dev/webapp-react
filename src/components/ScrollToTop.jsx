import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`${styles.scrollWrapper} ${isVisible ? styles.visible : ''}`}>
            <button
                className={styles.scrollButton}
                onClick={scrollToTop}
                aria-label="Torna all'inizio">
                <FontAwesomeIcon icon={faChevronUp} />
                <div className={styles.neonRing}></div>
            </button>
        </div>
    );
};

export default ScrollToTop;
