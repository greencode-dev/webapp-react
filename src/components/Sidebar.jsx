import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUndo, faCalendarAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import CyberScrollList from './CyberScrollList';
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
    yearCounts = {},
    totalCount = 0,
}) => {
    // Configurazione items per la CyberScrollList degli anni
    const yearItems = [
        { key: '', label: 'Tutti', icon: faGlobe, count: totalCount },
        ...availableYears.map((year) => ({
            key: year.toString(),
            label: year.toString(),
            icon: faCalendarAlt,
            count: yearCounts[year] || 0,
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
                <CyberScrollList
                    items={yearItems}
                    activeKey={selectedYear?.toString() || ''}
                    onSelect={(val) => onYearChange({ target: { value: val } })}
                    maxHeight="200px"
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
