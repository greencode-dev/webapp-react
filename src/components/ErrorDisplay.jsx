import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorDisplay.module.css';

function ErrorDisplay({ message, onRetry, showRetryButton = true }) {
    return (
        <Container className={styles.errorContainer}>
            <div className={styles.glitchWrapper}>
                <div className={styles.iconGlitchContainer}>
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={styles.iconGlitchMain}
                    />
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={`${styles.iconGlitchLayer} ${styles.cyan}`}
                    />
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className={`${styles.iconGlitchLayer} ${styles.magenta}`}
                    />
                    <div className={styles.soundWaveVisual}>
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={styles.soundBar}
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
                <h2 className={styles.errorTitle} data-text="SYSTEM ERROR">
                    SYSTEM ERROR
                </h2>
            </div>
            <p className={styles.errorMessage}>
                {message || 'Si è verificato un errore critico nel caricamento dei dati.'}
            </p>
            {showRetryButton && (
                <Button variant="primary" className="px-5 py-2 fw-bold" onClick={onRetry}>
                    REBOOT SYSTEM
                </Button>
            )}
        </Container>
    );
}

export default ErrorDisplay;
