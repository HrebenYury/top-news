import React from "react";
import { connect } from "react-redux";
import CardForTopNewsPage from "./CardForTopNewsPage";
import NotFound from "./NotFoud";

export const Technology = ({ news, error }) => {
  return (
    <div className="containerArticlesPage">
      {news &&
        news.map((item, index) => (
          <CardForTopNewsPage key={index} news={item} />
        ))}
      {error && <NotFound />}
    </div>
  );
};

export default connect((store) => ({
  news: store.topNews.technology.articles,
  error: store.errorTopNews,
}))(Technology);
