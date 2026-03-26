import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function MovieDetailSkeleton() {
    return (
        <Container className="py-5">
            <Card className="glass-card shadow-lg border-0 overflow-hidden mb-5">
                <Row className="g-0">
                    {/* Poster Skeleton */}
                    <Col md={4} className="p-4 d-flex align-items-center justify-content-center">
                        <div
                            className="skeleton"
                            style={{
                                width: '100%',
                                maxWidth: '350px',
                                aspectRatio: '2/3',
                                borderRadius: '1.25rem',
                            }}></div>
                    </Col>

                    {/* Info Skeleton */}
                    <Col md={8}>
                        <Card.Body className="p-4 p-lg-5 h-100 d-flex flex-column">
                            <div className="mb-4">
                                <div
                                    className="skeleton mb-3"
                                    style={{
                                        height: '32px',
                                        width: '100px',
                                        borderRadius: '5px',
                                    }}></div>{' '}
                                {/* Badge Genere */}
                                <div
                                    className="skeleton mb-2"
                                    style={{ height: '60px', width: '80%' }}></div>{' '}
                                {/* Titolo */}
                                <div
                                    className="skeleton"
                                    style={{ height: '24px', width: '50%' }}></div>{' '}
                                {/* Regista/Anno */}
                            </div>

                            <div className="flex-grow-1">
                                <div
                                    className="skeleton mb-3"
                                    style={{ height: '20px', width: '120px' }}></div>{' '}
                                {/* Label Trama */}
                                <div
                                    className="skeleton mb-2"
                                    style={{ height: '18px', width: '100%' }}></div>
                                <div
                                    className="skeleton mb-2"
                                    style={{ height: '18px', width: '95%' }}></div>
                                <div
                                    className="skeleton mb-2"
                                    style={{ height: '18px', width: '98%' }}></div>
                            </div>

                            <div className="mt-4 text-end">
                                <div
                                    className="skeleton d-inline-block"
                                    style={{
                                        height: '40px',
                                        width: '160px',
                                        borderRadius: '5px',
                                    }}></div>{' '}
                                {/* Bottone Indietro */}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            {/* Reviews Section Skeleton */}
            <div className="reviews-section">
                <div className="skeleton mb-4" style={{ height: '40px', width: '300px' }}></div>{' '}
                {/* Titolo Recensioni */}
                <Row>
                    {[1, 2].map((i) => (
                        <Col key={i} md={6}>
                            <div className="glass-card mb-4 p-4 border-0">
                                <div className="d-flex align-items-center mb-3">
                                    {/* Avatar e Nome */}
                                    <div
                                        className="skeleton rounded-circle me-3"
                                        style={{ width: '32px', height: '32px' }}></div>
                                    <div
                                        className="skeleton"
                                        style={{ height: '20px', width: '120px' }}></div>
                                </div>
                                {/* Testo recensione */}
                                <div
                                    className="skeleton mb-2"
                                    style={{ height: '16px', width: '100%' }}></div>
                                <div
                                    className="skeleton"
                                    style={{ height: '16px', width: '80%' }}></div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default MovieDetailSkeleton;
