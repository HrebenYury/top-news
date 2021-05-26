import React from "react";
import { connect } from "react-redux";

function makeDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nocvember",
    "December",
  ];
  const objDate = new Date(date);
  const stringDate = `${objDate.getDate()} ${
    months[objDate.getMonth()]
  } ${objDate.getFullYear()}`;
  return stringDate;
}

export const CardForArticlesPage = ({ article, light }) => {
  const stringDate = makeDate(article.date);

  const cardClass = light ? "blackTheme" : "whiteTheme";

  return (
    <div className={`${cardClass}`} id={article.id}>
      <div className="card">
        <article>
          <h1>{article.title}</h1>
          <p>{article.article}</p>
          <span>{stringDate}</span>
        </article>
      </div>
    </div>
  );
};

export default connect((store) => ({
  light: store.light,
}))(CardForArticlesPage);
