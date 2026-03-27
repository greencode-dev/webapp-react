import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './SortSelector.module.css';

function SortSelector({ value, onChange }) {
    const sortLabels = {
        latest: 'Più recenti',
        oldest: 'Meno recenti',
        rating_desc: 'Voto più alto',
        rating_asc: 'Voto più basso',
    };

    return (
        <div className={styles.selectWrapper}>
            <span className={`${styles.selectLabel} text-neon-secondary`}>Ordina per:</span>
            <Dropdown onSelect={(val) => onChange({ target: { value: val } })}>
                <Dropdown.Toggle variant="none" className={styles.dropdownToggle}>
                    {sortLabels[value]}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                    {Object.entries(sortLabels).map(([key, label]) => (
                        <Dropdown.Item key={key} eventKey={key} active={value === key}>
                            {label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default SortSelector;
