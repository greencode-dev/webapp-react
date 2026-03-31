import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import styles from './CyberInput.module.css';

/**
 * CyberInput Component
 * Sostituisce i campi di input standard con una versione a tema neon
 * che attiva un effetto glitch al focus.
 */
const CyberInput = ({
    label,
    labelClass,
    isInvalid,
    isCritical,
    isGold,
    type = 'text',
    children,
    ...props
}) => {
    const isTextArea = type === 'textarea';

    return (
        <Form.Group className={styles.wrapper}>
            {label && (
                <Form.Label className={`${styles.cyberLabel} ${labelClass || ''}`}>
                    {label}
                </Form.Label>
            )}
            <div className={styles.container}>
                {isGold && (
                    <div className={styles.goldIcon}>
                        <FontAwesomeIcon icon={faGem} />
                    </div>
                )}
                <Form.Control
                    as={isTextArea ? 'textarea' : 'input'}
                    type={isTextArea ? undefined : type}
                    className={`
                        ${styles.cyberInput} 
                        ${isInvalid ? styles.invalid : ''} 
                        ${isCritical ? styles.critical : ''}
                        ${isGold ? styles.gold : ''}
                    `}
                    {...props}
                />
                <div className={styles.glitchOvr}>
                    <div className={`${styles.glitchLayer} ${styles.red}`}></div>
                    <div className={`${styles.glitchLayer} ${styles.cyan}`}></div>
                </div>
                {children}
            </div>
        </Form.Group>
    );
};

export default CyberInput;
