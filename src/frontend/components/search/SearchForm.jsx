import React, { useCallback, useState, useEffect } from "react";
import './searchform.less';

export default function SearchForm({ onSubmitCallback, data, placeholder }) {
    const [searchText, setSearchText] = useState('');

    const onChange = useCallback((e) => setSearchText(e.target.value), [setSearchText]);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmitCallback(searchText);
        },
        [onSubmitCallback, searchText]
    );

    useEffect(() => (data && setSearchText(data)), [data]);

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input className="search-input" type="text" onChange={onChange} placeholder={placeholder} value={searchText} />
            <input className="search-button" type="submit" value="Submit" />
        </form>
    );
};
