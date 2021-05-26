import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

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

const CardForFormPage = ({ article, remove, edit, light }) => {
  const stringDate = makeDate(article.date);

  const cardClass = light ? "blackTheme" : "whiteTheme";

  return (
    <div className={`findedCard ${cardClass}`} id={article.id}>
      <article>
        <h1>{article.title}</h1>
        <button
          id={article.id}
          onClick={remove}
          className="deleteArticle"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <p>{article.article}</p>
        <span>{stringDate}</span>
        <button
          id={article.id}
          onClick={edit}
          className="editArticle"
          title="Edit"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </article>
    </div>
  );
};

export default connect((store) => ({
  light: store.light,
}))(CardForFormPage);
