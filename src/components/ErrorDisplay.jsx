import React from 'react';
import { Container, Button } from 'react-bootstrap';

function ErrorDisplay({ message, onRetry, showRetryButton = true }) {
    return (
        <Container className="py-5">
            <div className="text-center py-5 text-danger">
                <h2>{message}</h2>
                {showRetryButton && (
                    <Button variant="primary" className="mt-3" onClick={onRetry}>
                        Riprova
                    </Button>
                )}
            </div>
        </Container>
    );
}

export default ErrorDisplay;
