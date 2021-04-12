import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const HeaderComponent = ({ chooseTheme, light }) => {

    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");

        mediaQuery.addEventListener("change", handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    const checkBoxHandler = (e) => {
        chooseTheme(e.currentTarget.checked);
    }

    const cardClass = light ? "blackTheme" : "whiteTheme"

    return (
        <header className={`Header ${cardClass}`}>
            <div className="switch">
                <input type="checkbox" id="colored" onChange={checkBoxHandler} />
                <label htmlFor="colored"></label>
            </div>
            {(!isSmallScreen || isNavVisible) && (
                <nav className={`Nav ${cardClass}`}>
                    <Link to="/">Add Article</Link>
                    <Link to="/articles" >Articles</Link>
                    <Link to="/sports" >Sport</Link>
                    <Link to="/technology" >Technology  </Link>
                    <Link to="/science" >Science</Link>
                </nav>
            )}
            <button onClick={toggleNav} className="Burger">
                <FontAwesomeIcon icon={faBars} />
            </button>
        </header>
    )
}

