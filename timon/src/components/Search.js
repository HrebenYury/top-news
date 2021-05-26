import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ search }) => {

    const [date, setDate] = useState('');

    useEffect(() => {
        let today = new Date().toISOString().substr(0, 10);
        setDate(today)
    }, [])

    const searchHandler = (e) => {
        e.preventDefault();
        setDate(e.currentTarget.value);
    }

    return (
        <div className="dateInput">
            <input type="date" onChange={searchHandler} value={date} />
            <button onClick={()=>{search(date)}}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    )
}

export default Search;
