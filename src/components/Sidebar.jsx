import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUndo } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.css';

const Sidebar = ({
    availableGenres,
    selectedGenres,
    onGenreToggle,
    availableYears,
    selectedYear,
    onYearChange,
    onReset,
}) => {
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
                        <span className={styles.genreName}>{genre}</span>
                    </label>
                ))}
            </div>

            <div className={`${styles.filterGroup} mt-4`}>
                <span className={styles.groupLabel}>Anno di rilascio</span>
                <select className={styles.yearSelect} value={selectedYear} onChange={onYearChange}>
                    <option value="">Tutti gli anni</option>
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <button className={styles.resetBtn} onClick={onReset} data-text="RESET FILTRI">
                <FontAwesomeIcon icon={faUndo} className="me-2" />
                RESET FILTRI
            </button>
        </aside>
    );
};

export default Sidebar;
