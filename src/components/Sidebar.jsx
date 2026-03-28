import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUndo, faCalendarAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import CyberDropdown from './CyberDropdown';
import CountUp from './CountUp';
import styles from './Sidebar.module.css';

const Sidebar = ({
    availableGenres,
    selectedGenres,
    onGenreToggle,
    availableYears,
    selectedYear,
    onYearChange,
    onReset,
    genreCounts = {},
}) => {
    // Prepariamo gli anni per il CyberDropdown
    const yearItems = [
        { key: '', label: 'Tutti gli anni', icon: faGlobe },
        ...availableYears.map((year) => ({
            key: year.toString(),
            label: year.toString(),
            icon: faCalendarAlt,
        })),
    ];

    return (
        <aside className={styles.sidebar}>
            <h3 className={styles.filterTitle}>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Filtri
            </h3>
            <div className={styles.filterGroup}>
                <span className={styles.groupLabel}>Categorie</span>
                {availableGenres.map((genre) => (
                    <label key={genre} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => onGenreToggle(genre)}
                        />
                        <span className={styles.customCheck}></span>
                        <span className={styles.genreName}>
                            {genre}
                            <span className={styles.genreCount}>
                                (<CountUp end={genreCounts[genre] || 0} />)
                            </span>
                        </span>
                    </label>
                ))}
            </div>

            <div className={`${styles.filterGroup} mt-4`}>
                <span className={styles.groupLabel}>Anno di rilascio</span>
                <CyberDropdown
                    label={selectedYear || 'Tutti gli anni'}
                    items={yearItems}
                    onSelect={(val) => onYearChange({ target: { value: val } })}
                    activeKey={selectedYear?.toString() || ''}
                    variant="outline-secondary"
                    className="w-100"
                />
            </div>

            <button className={styles.resetBtn} onClick={onReset} data-text="RESET FILTRI">
                <FontAwesomeIcon icon={faUndo} className="me-2" />
                RESET FILTRI
            </button>
        </aside>
    );
};

export default Sidebar;
