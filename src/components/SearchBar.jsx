import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, placeholder }) {
    return (
        <div className={`${styles.searchContainer} mb-5`}>
            <InputGroup className={styles.neonSearchGroup}>
                <InputGroup.Text className={styles.neonSearchIcon}>
                    <span role="img" aria-label="search">
                        🔍
                    </span>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder={placeholder || 'Cerca...'}
                    value={value}
                    onChange={onChange}
                    className={styles.neonSearchInput}
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;
