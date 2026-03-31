import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons';
import CyberInput from './CyberInput';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, placeholder, loading }) {
    const handleClear = () => onChange({ target: { value: '' } });

    return (
        <div className={`${styles.searchContainer} mb-5`}>
            <div className={styles.searchGlitchWrapper}>
                <CyberInput
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || 'Cerca un film...'}
                    className={styles.cyberSearchInput}
                    autoComplete="off">
                    <div
                        className={`${styles.searchIconInside} ${loading ? styles.loadingIcon : ''}`}>
                        <FontAwesomeIcon
                            icon={loading ? faCircleNotch : faMagnifyingGlass}
                            spin={loading}
                        />
                    </div>
                    {value && (
                        <button
                            className={styles.searchClearInside}
                            onClick={handleClear}
                            title="Cancella ricerca">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </CyberInput>
            </div>
        </div>
    );
}

export default SearchBar;
