import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from './ErrorDisplay.module.css';

function ErrorDisplay({ message, onRetry, showRetryButton = true }) {
    return (
        <Container className={styles.errorContainer}>
            <div className={styles.glitchWrapper}>
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
