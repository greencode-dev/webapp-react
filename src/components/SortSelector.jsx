import React from 'react';
import { Form } from 'react-bootstrap';

function SortSelector({ value, onChange }) {
    return (
        <div className="neon-select-wrapper">
            <span className="neon-select-label">Ordina per:</span>
            <Form.Select size="sm" className="neon-select" value={value} onChange={onChange}>
                <option value="latest">Più recenti</option>
                <option value="oldest">Meno recenti</option>
                <option value="rating_desc">Voto più alto</option>
                <option value="rating_asc">Voto più basso</option>
            </Form.Select>
        </div>
    );
}

export default SortSelector;
