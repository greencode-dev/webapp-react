import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUndo, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CountUp from './CountUp';
import styles from './Sidebar.module.css';

const Sidebar = ({
    availableGenres,
    selectedGenres,
    onGenreToggle,
    availableYears,
    selectedYears,
    onYearToggle,
    onReset,
    genreCounts = {},
    yearCounts = {},
    totalCount = 0,
}) => {
    const [openSection, setOpenSection] = useState(null); // Di base tutto chiuso

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <aside className={styles.sidebar}>
            <h3 className={styles.filterTitle}>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Filtri
            </h3>

            {/* Sezione Categorie */}
            <div
                className={`${styles.accordionItem} ${openSection === 'genres' ? styles.isOpen : ''}`}>
                <button className={styles.accordionHeader} onClick={() => toggleSection('genres')}>
                    <span
                        className={
                            openSection === 'genres' ? styles.groupLabel : styles.selectedSummary
                        }>
                        {openSection === 'genres'
                            ? 'Categorie'
                            : selectedGenres.length > 0
                              ? selectedGenres.length === 1
                                  ? selectedGenres[0]
                                  : `${selectedGenres.length} Selezionate`
                              : 'Categorie'}
                    </span>
                    <div className={styles.headerActions}>
                        {openSection !== 'genres' && selectedGenres.length > 0 && (
                            <span className={styles.activeIndicator}></span>
                        )}
                        <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
                    </div>
                </button>
                <div className={styles.accordionContent}>
                    <div className={styles.filterGroup}>
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
                </div>
            </div>

            {/* Sezione Anni */}
            <div
                className={`${styles.accordionItem} ${openSection === 'years' ? styles.isOpen : ''}`}>
                <button className={styles.accordionHeader} onClick={() => toggleSection('years')}>
                    <div className={styles.headerLabels}>
                        <span className={styles.groupLabel}>Anno di rilascio</span>
                        {openSection !== 'years' && selectedYears.length > 0 && (
                            <span className={styles.selectedSummary}>
                                {selectedYears.length <= 2
                                    ? selectedYears.join(', ')
                                    : `${selectedYears.length} Selezionate`}
                            </span>
                        )}
                    </div>
                    <div className={styles.headerActions}>
                        {openSection !== 'years' && selectedYears.length > 0 && (
                            <span className={styles.activeIndicator}></span>
                        )}
                        <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
                    </div>
                </button>
                <div className={styles.accordionContent}>
                    <div className={styles.filterGroup}>
                        <div className={styles.yearsScroll}>
                            {availableYears.map((year) => (
                                <label key={year} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedYears.includes(year.toString())}
                                        onChange={() => onYearToggle(year.toString())}
                                    />
                                    <span className={styles.customCheck}></span>
                                    <span className={styles.genreName}>
                                        {year}
                                        <span className={styles.genreCount}>
                                            (<CountUp end={yearCounts[year] || 0} />)
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button className={styles.resetBtn} onClick={onReset} data-text="RESET FILTRI">
                <FontAwesomeIcon icon={faUndo} className="me-2" />
                RESET FILTRI
            </button>
        </aside>
    );
};

export default Sidebar;
