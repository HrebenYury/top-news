import React from "react";
import { CardForArticlesPage } from '../mainContainer'
import NotFound from './NotFoud';

export const ArticlesPage = ({ articles, error }) => {
    return (
        <div className="containerArticlesPage myArticle">
            {articles && articles.map((i) =>
                <CardForArticlesPage
                    key={i.id}
                    article={i}
                />
            )}
            {error && <NotFound />}
        </div>
    )
}


