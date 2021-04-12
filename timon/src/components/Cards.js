import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'


function makeDate(date) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
    ];
    const objDate = new Date(date);
    const stringDate = `${objDate.getDate()} ${months[objDate.getMonth()]} ${objDate.getFullYear()}`
    return stringDate;
}

export const ForArticlesPage = ({ article, light }) => {

    const stringDate = makeDate(article.date)

    const cardClass = light ? "blackTheme" : "whiteTheme"

    return (
        <div className={`${cardClass}`} id={article.id}>
            <div className='card'>
                <article>
                    <h1>{article.title}</h1>
                    <p>{article.article}</p>
                    <span>{stringDate}</span>
                </article>
            </div>
        </div>
    )
}

export const ForFormPage = ({ article, remove, edit, light }) => {

    const stringDate = makeDate(article.date)

    const cardClass = light ? "blackTheme" : "whiteTheme"

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
    )
}


export const ForTopNewsPage = ({ news, light }) => {
    const date = news.publishedAt.trim().slice(0, 10);

    const cardClass = light ? "blackTheme" : "whiteTheme"

    return (
        <div className={`${cardClass}`} >
            <a href={news.url} target="_blank" rel="noreferrer" className={`card ${cardClass}`}>
                <div className="thumb" style={{ backgroundImage: 'url(' + news.urlToImage + ')' }}></div>
                <article>
                    <h1>{news.title}</h1>
                    <span>{date}</span>
                </article>
            </a>
        </div>
    )
}

