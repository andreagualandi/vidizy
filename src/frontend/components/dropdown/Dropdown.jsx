import React, { useCallback, useState, useEffect } from "react";
import './dropdown.less';

export default function Dropdown({ data, placeholder, onSelect }) {
    const [selected, setSelected] = useState('');
    const onChange = useCallback((e) => setSelected(e.target.value), [setSelected]);

    useEffect(() => (selected && onSelect(selected)), [selected]);

    return (
        <select value={selected} onChange={onChange} className="dropdown">
            <option value='' key='-1' disabled hidden>{placeholder}</option>
            {data.map(option => { return <option value={option.id} key={option.id} >{option.description}</option> })}
        </select>
    )
}