import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from './CountUp';
import styles from './CyberScrollList.module.css';

const CyberScrollList = ({ items, activeKey, onSelect, maxHeight = '200px' }) => {
    return (
        <div className={styles.listContainer} style={{ maxHeight }}>
            {items.map((item) => (
                <button
                    key={item.key}
                    className={`${styles.listItem} ${activeKey === item.key ? styles.activeItem : ''}`}
                    onClick={() => onSelect(item.key)}>
                    <span className={styles.itemLabel}>
                        {item.icon && (
                            <FontAwesomeIcon icon={item.icon} className="me-2 opacity-50" />
                        )}
                        {item.label}
                    </span>
                    {item.count !== undefined && (
                        <span className={styles.itemCount}>
                            (<CountUp end={item.count} />)
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default CyberScrollList;
