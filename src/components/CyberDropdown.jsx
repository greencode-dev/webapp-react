import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CyberDropdown.module.css';

const CyberDropdown = ({
    label,
    items = [],
    onSelect,
    activeKey,
    variant = 'outline-info',
    className = '',
    fetchItems = null, // Funzione asincrona opzionale per caricare i dati
}) => {
    const [internalItems, setInternalItems] = useState(items);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (fetchItems) {
            setLoading(true);
            fetchItems()
                .then((data) => setInternalItems(data))
                .catch((err) => console.error('CyberDropdown Async Error:', err))
                .finally(() => setLoading(false));
        } else {
            setInternalItems(items);
        }
    }, [fetchItems, items]);

    return (
        <Dropdown onSelect={onSelect} className={className}>
            <Dropdown.Toggle variant={variant} id="cyber-dropdown-toggle">
                {loading ? 'SYNCING...' : label}
            </Dropdown.Toggle>

            <Dropdown.Menu className={`${styles.menu} ${styles.menuVisible}`}>
                {loading ? (
                    <div className={styles.loader}>
                        <small>CARICAMENTO OLOGRAFICO...</small>
                    </div>
                ) : internalItems.length > 0 ? (
                    internalItems.map((item) => (
                        <Dropdown.Item
                            key={item.key}
                            eventKey={item.key}
                            className={`${styles.item} ${activeKey === item.key ? styles.itemActive : ''}`}
                            active={activeKey === item.key}>
                            {item.icon && (
                                <span className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </span>
                            )}
                            {item.label}
                        </Dropdown.Item>
                    ))
                ) : (
                    <div className={styles.loader}>
                        <small>NESSUN DATO TROVATO</small>
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CyberDropdown;
