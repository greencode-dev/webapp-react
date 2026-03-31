import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { postReview } from '../api/api';
import styles from './ReviewForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons';
import CyberInput from './CyberInput';

// Semplice componente per le particelle olografiche (Bonus Animation)
const HologramParticles = () => (
    <div className={styles.hologramContainer}>
        {[...Array(25)].map((_, i) => (
            <div
                key={i}
                className={styles.particle}
                style={{
                    '--x': `${Math.random() * 100}%`,
                    '--y': `${Math.random() * 100}%`,
                    '--delay': `${Math.random() * 1}s`,
                    '--duration': `${1 + Math.random() * 2}s`,
                }}
            />
        ))}
    </div>
);

const MAX_CHARS = 500;

const ReviewForm = ({ movieId, onReviewSuccess }) => {
    const initialForm = {
        author: '',
        rating: 5,
        text: '',
    };

    const [formData, setFormData] = useState(initialForm);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    // Caricamento bozza dal localStorage (Milestone Bonus)
    useEffect(() => {
        const savedDraft = localStorage.getItem(`review_draft_${movieId}`);
        if (savedDraft) {
            setFormData(JSON.parse(savedDraft));
        }
    }, [movieId]);

    // Salvataggio bozza automatica
    useEffect(() => {
        if (formData.author || formData.text) {
            localStorage.setItem(`review_draft_${movieId}`, JSON.stringify(formData));
        }
    }, [formData, movieId]);

    // Validazione semplice (Bonus)
    const isFormValid = formData.author.trim().length >= 2 && formData.text.trim().length >= 5;

    const clearDraft = () => {
        setFormData(initialForm);
        localStorage.removeItem(`review_draft_${movieId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await postReview(movieId, formData);
            setStatus({
                type: 'success',
                message:
                    'Recensione inviata con successo! Il sistema olografico si sta aggiornando...',
            });
            setFormData(initialForm);
            localStorage.removeItem(`review_draft_${movieId}`);

            // Milestone 3: Notifica il padre per aggiornare i dati
            if (onReviewSuccess) {
                setTimeout(() => onReviewSuccess(), 1500);
            }
        } catch (error) {
            setStatus({ type: 'danger', message: "Errore durante l'invio. Riprova più tardi." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`glass-card p-4 ${styles.formContainer}`}>
            {/* Mostra le particelle solo quando il caricamento ha successo */}
            {status.type === 'success' && <HologramParticles />}

            <h3
                className={`${styles.glitchTitle} mb-4 text-neon-primary`}
                data-text="Lascia una Recensione">
                Lascia una Recensione
            </h3>

            {status.message && (
                <Alert variant={status.type} className={styles.neonAlert}>
                    {status.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <CyberInput
                    label="Nome Utente"
                    labelClass="text-neon-secondary"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo nome..."
                    isInvalid={formData.author && formData.author.length < 2}
                    required
                />

                <Form.Group className="mb-3">
                    <Form.Label className="text-neon-secondary">Voto (1-5)</Form.Label>
                    <div className={styles.starRatingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesomeIcon
                                key={star}
                                icon={faStar}
                                className={`${styles.interactiveStar} ${
                                    (hoverRating || formData.rating) >= star
                                        ? styles.activeStar
                                        : ''
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                            />
                        ))}
                    </div>
                </Form.Group>

                <CyberInput
                    label="Il tuo Commento"
                    labelClass="text-neon-secondary"
                    type="textarea"
                    rows={4}
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    maxLength={MAX_CHARS}
                    placeholder="Cosa ne pensi del film?"
                    isInvalid={formData.text && formData.text.length < 5}
                    required>
                    <div className={styles.counterContainer}>
                        {formData.text.length > 0 && (
                            <button
                                type="button"
                                className={styles.glitchClearBtn}
                                onClick={clearDraft}
                                data-text="Reset Matrix">
                                Reset Matrix
                            </button>
                        )}
                        <span
                            className={`${styles.charCounter} ${formData.text.length >= MAX_CHARS * 0.9 ? styles.counterWarning : ''}`}>
                            {formData.text.length} / {MAX_CHARS}
                        </span>
                    </div>
                </CyberInput>

                <Button
                    type="submit"
                    className="btn-primary w-100"
                    disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? (
                        'Sincronizzazione...'
                    ) : (
                        <>
                            Invia Recensione{' '}
                            <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
                        </>
                    )}
                </Button>
            </Form>
        </div>
    );
};

export default ReviewForm;
