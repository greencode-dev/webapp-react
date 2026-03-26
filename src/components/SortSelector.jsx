import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SortSelector({ value, onChange }) {
    const sortLabels = {
        latest: 'Più recenti',
        oldest: 'Meno recenti',
        rating_desc: 'Voto più alto',
        rating_asc: 'Voto più basso',
    };

    return (
        <div className="neon-select-wrapper">
            <span className="neon-select-label text-neon-secondary">Ordina per:</span>
            <Dropdown onSelect={(val) => onChange({ target: { value: val } })}>
                <Dropdown.Toggle variant="none" className="neon-dropdown-toggle">
                    {sortLabels[value]}
                </Dropdown.Toggle>

                <Dropdown.Menu className="neon-dropdown-menu">
                    {Object.entries(sortLabels).map(([key, label]) => (
                        <Dropdown.Item key={key} eventKey={key} active={value === key}>
                            {label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default SortSelector;
