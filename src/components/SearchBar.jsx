import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, placeholder, loading }) {
    const handleClear = () => onChange({ target: { value: '' } });

    return (
        <div className={`${styles.searchContainer} mb-5`}>
            <InputGroup className={styles.neonSearchGroup}>
                <InputGroup.Text
                    className={`${styles.neonSearchIcon} ${loading ? styles.loadingIcon : ''}`}>
                    <FontAwesomeIcon
                        icon={loading ? faCircleNotch : faMagnifyingGlass}
                        spin={loading}
                    />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder={placeholder || 'Cerca...'}
                    value={value}
                    onChange={onChange}
                    className={styles.neonSearchInput}
                />
                {value && (
                    <button
                        className={styles.glitchClearBtn}
                        onClick={handleClear}
                        title="Cancella ricerca">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}
            </InputGroup>
        </div>
    );
}

export default SearchBar;
