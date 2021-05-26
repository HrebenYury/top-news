import React, { useState } from "react";
import CardForFormPage from './CardForFormPage';
import { connect } from "react-redux";
import { fetchArticlesIfNeed, searchArticlesByDate } from "../actions/index";
import Search from "./Search";

export function Form({ fetchArticlesIfNeed, searchArticlesByDate, articles }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setID] = useState(0);
  const [date, setDate] = useState("");

  const changeTitle = (e) => {
    e.preventDefault();
    setTitle(e.currentTarget.value);
  };

  const changeText = (e) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const submitButton = (e) => {
    e.preventDefault();
    if (id === 0) {
      submitArticle();
    } else {
      editArticle();
    }
  };

  const editArticle = async () => {
    await fetch("http://localhost:3001/api/articles", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
        text: text,
      }),
    });
    fetchArticlesIfNeed();
    searchArticlesByDate(date);
    setID(0);
    setTitle("");
    setText("");
  };

  const submitArticle = async () => {
    await fetch("http://localhost:3001/api/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleTitle: title,
        articleDescription: text,
      }),
    });
    fetchArticlesIfNeed();
    setID(0);
    setTitle("");
    setText("");
  };

  const deleteArticle = async (e) => {
    const id = e.currentTarget.id;
    await fetch(`http://localhost:3001/api/articles/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    fetchArticlesIfNeed();
    searchArticlesByDate(date);
  };

  const getArticle = async (e) => {
    const id = e.currentTarget.id;
    const response = await fetch(`http://localhost:3001/api/articles/${id}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const article = await response.json();
      setID(article.id);
      setTitle(article.title);
      setText(article.article);
    }
  };

  const validate = () => {
    if (title.trim() && text.trim()) {
      return true;
    } else {
      return false;
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setID(0);
    setTitle("");
    setText("");
  };

  const showSerachByDate = () => {
    if (articles.length === 0) {
      return <p>nothing to find</p>;
    } else {
      return articles.map((i) => (
        <CardForFormPage
          key={i.id}
          article={i}
          remove={deleteArticle}
          edit={getArticle}
        />
      ));
    }
  };

  const dateInput = (date) => {
    setDate(date);
    searchArticlesByDate(date);
  };

  return (
    <div className="formContainer">
      <div className="formField">
        <h2>Add Article</h2>
        <form onSubmit={submitButton}>
          <input type="hidden" name="id" value={id} />
          <label>Title</label>
          <textarea
            className="title"
            onChange={changeTitle}
            value={title}
          ></textarea>
          <label>Article</label>
          <textarea
            className="bigText"
            onChange={changeText}
            value={text}
          ></textarea>
          <div className="formButtonsContainer">
            <button
              className="addBtn btn"
              onClick={submitButton}
              disabled={!validate()}
            >
              Add
            </button>
            <button className="resetBtn btn" onClick={resetForm}>
              reset
            </button>
          </div>
        </form>
        <Search search={dateInput} />
      </div>
      <div className="searchField">
        <h2>Artciles by date</h2>
        <div className="findedArticles">{articles && showSerachByDate()}</div>
      </div>
    </div>
  );
}

export default connect(
  (store) => ({
    articles: store.content.dateSearch,
    error: store.errorSearch,
  }),
  (dispatch) => ({
    fetchArticlesIfNeed: () => {
      dispatch(fetchArticlesIfNeed());
    },
    searchArticlesByDate: (date) => {
      dispatch(searchArticlesByDate(date));
    },
  })
)(Form);
