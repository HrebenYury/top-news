import React from "react";
import { connect } from "react-redux";

const CardForTopNewsPage = ({ news, light }) => {
  const date = news.publishedAt.trim().slice(0, 10);

  const cardClass = light ? "blackTheme" : "whiteTheme";

  return (
    <div className={`${cardClass}`}>
      <a
        href={news.url}
        target="_blank"
        rel="noreferrer"
        className={`card ${cardClass}`}
      >
        <div
          className="thumb"
          style={{ backgroundImage: "url(" + news.urlToImage + ")" }}
        ></div>
        <article>
          <h1>{news.title}</h1>
          <span>{date}</span>
        </article>
      </a>
    </div>
  );
};

export default connect((store) => ({
  light: store.light,
}))(CardForTopNewsPage);
