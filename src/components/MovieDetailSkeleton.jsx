import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../pages/MovieDetailSkeleton.module.css';

function MovieDetailSkeleton() {
    return (
        <Container className="py-5">
            <Card className={styles.detailCard}>
                <Row>
                    {/* Poster Skeleton */}
                    <Col md={4} className={styles.posterContainer}>
                        <div className={styles.heroBlock}></div>
                    </Col>

                    {/* Info Skeleton */}
                    <Col md={8}>
                        <Card.Body className={styles.infoBlock}>
                            <div className="mb-4">
                                <div className={`${styles.genreBadge} mb-3`}></div>
                                {/* Badge Genere */}
                                <div className={`${styles.largeTitle} mb-2`}></div>
                                {/* Titolo */}
                                <div className={styles.metaLine}></div>
                                {/* Regista/Anno */}
                            </div>

                            <div className="flex-grow-1">
                                <div className={`${styles.labelLine} mb-3`}></div>
                                {/* Label Trama */}
                                <div className={styles.paragraph}></div>
                            </div>

                            <div className="mt-4 text-end">
                                <div className={styles.backButton}></div>
                                {/* Bottone Indietro */}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            {/* Reviews Section Skeleton */}
            <div className="reviews-section">
                <div className={`${styles.sectionTitle} mb-4`}></div>
                {/* Titolo Recensioni */}
                <Row>
                    {[1, 2].map((i) => (
                        <Col key={i} md={6}>
                            <div className={`${styles.reviewSkeletonCard} mb-4 p-4`}>
                                <div className={`${styles.flexRow} mb-3`}>
                                    {/* Avatar e Nome */}
                                    <div className={`${styles.avatar} me-3`}></div>
                                    <div className={styles.reviewName}></div>
                                </div>
                                {/* Testo recensione */}
                                <div className={styles.reviewText}></div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default MovieDetailSkeleton;
