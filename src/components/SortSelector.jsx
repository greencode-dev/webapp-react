import React from 'react';
import {
    faClock,
    faHistory,
    faSortAmountUp,
    faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';
import CyberDropdown from './CyberDropdown';
import styles from './SortSelector.module.css';

function SortSelector({ value, onChange }) {
    const sortConfig = {
        latest: { label: 'Più recenti', icon: faClock },
        oldest: { label: 'Meno recenti', icon: faHistory },
        rating_desc: { label: 'Voto più alto', icon: faSortAmountDown },
        rating_asc: { label: 'Voto più basso', icon: faSortAmountUp },
    };

    // Trasformiamo l'oggetto in un array compatibile con CyberDropdown
    const items = Object.entries(sortConfig).map(([key, config]) => ({
        key,
        label: config.label,
        icon: config.icon,
    }));

    return (
        <div className={styles.selectWrapper}>
            <span className={`${styles.selectLabel} text-neon-secondary`}>Ordina per:</span>
            <CyberDropdown
                label={sortConfig[value].label}
                items={items}
                onSelect={(val) => onChange({ target: { value: val } })}
                activeKey={value}
                variant="none"
            />
        </div>
    );
}

export default SortSelector;
