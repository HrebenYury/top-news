import React from "react";
import { connect } from "react-redux";
import CardForArticlesPage from "./CardForArticlesPage";
import NotFound from "./NotFoud";

export const Articles = ({ articles, error }) => {
  return (
    <div className="containerArticlesPage myArticle">
      {articles &&
        articles.map((i) => <CardForArticlesPage key={i.id} article={i} />)}
      {error && <NotFound />}
    </div>
  );
};

export default connect((store) => ({
  articles: store.content.articles,
  error: store.errorMyArticles,
}))(Articles);