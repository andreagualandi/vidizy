import React, { useCallback, useState } from "react";
import './searchform.less';

export default function SearchForm({ onSubmitCallback }) {
    const [searchText, setSearchText] = useState();
    const onChange = useCallback((e) => setSearchText(e.target.value), [setSearchText]);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmitCallback(searchText);
        },
        [onSubmitCallback, searchText]
    );

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input className="search-input" type="text" onChange={onChange} placeholder="Video url" />
            <input className="search-button" type="submit" value="Submit" />
        </form>
    );
};
