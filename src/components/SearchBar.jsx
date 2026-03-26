import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function SearchBar({ value, onChange, placeholder }) {
    return (
        <div className="search-container mb-5">
            <InputGroup className="neon-search-group">
                <InputGroup.Text className="neon-search-icon">
                    <span role="img" aria-label="search">
                        🔍
                    </span>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder={placeholder || 'Cerca...'}
                    value={value}
                    onChange={onChange}
                    className="neon-search-input"
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;
