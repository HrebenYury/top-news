import React from 'react';
import { CardForTopNewsPage } from '../mainContainer'
import NotFound from './NotFoud';

export const SportPage = ({ news, error }) => {
    return (
        <div className="containerArticlesPage">
            {
                news && news.map((item, index) => (<CardForTopNewsPage key={index} news={item} />))
            }
            {error && <NotFound />}
        </div>
    )
}

export const TechnologyPage = ({ news, error }) => {
    return (
        <div className="containerArticlesPage">
            {
                news && news.map((item, index) => (<CardForTopNewsPage key={index} news={item} />))
            }
            {error && <NotFound />}
        </div>
    )
}

export const SciecePage = ({ news, error }) => {
    return (
        <div className="containerArticlesPage">
            {
                news && news.map((item, index) => (<CardForTopNewsPage key={index} news={item} />))
            }
            {error && <NotFound />}
        </div>
    )
}