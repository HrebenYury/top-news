export const requestArticles = () => ({
    type: "REQUEST_ARTICLES",
    isFetching: true,
    errorMyArticles: false
})

export const receiveArticles = (articles) => ({
    type: "RECEIVE_ARTICLES",
    isFetching: false,
    errorMyArticles: false,
    articles: { articles }
})

export const errorReport = () => ({
    type: "ERROR_MY_ARTICLES_REPORT",
    isFetching: false,
    errorMyArticles: true,
})

export function fetchArticles() {
    return dispatch => {
        dispatch(requestArticles())
        return fetch("http://localhost:3001/api/articles", {
            method: "GET",
            headers: { "Accept": "application/json" }
        }).then(response => response.json())
            .then(articles => dispatch(receiveArticles(articles.reverse())))
            .catch(error => dispatch(errorReport()))
    }
}

function mustFetchArticles(state) {
    const articles = state.content;
    if ( articles.length > 0) {
        return false;
    }
    return true;
}

export function fetchArticlesIfNeed() {
    return (dispatch, getState) => {
        if (mustFetchArticles(getState())) {
            return dispatch(fetchArticles());
        }
    }
}


/* 
******************************************************************************
SEARCH ACTIONS 
******************************************************************************
*/

export const requestSearchDate = () => ({
    type: "REQUEST_SEARCH_DATE",
    isFetching: true
})

export const receiveSearchDate = (dateSearch) => ({
    type: "RECEIVE_SEARCH_DATE",
    isFetching: false,
    errorSearch: false,
    dateSearch: { dateSearch }
})

export const errorSearchReport = () => ({
    type: "ERROR_SEARCH_DATE_REPORT",
    isFetching: false,
    errorSearch: true
})

export function searchArticlesByDate(date) {
    return dispatch => {
        dispatch(requestSearchDate())
        return fetch(`http://localhost:3001/api/search/${date}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        }).then(response => response.json())
            .then(articles => dispatch(receiveSearchDate(articles.reverse())))
            .catch(error => dispatch(errorSearchReport()))
    }
}


/* 
******************************************************************************
TopNews ACTIONS 
******************************************************************************
*/


export const requestTopNews = () => ({
    type: "REQUEST_TOP_NEWS",
    isFetching: true
})

export const receiveTopNews = (topNews) => ({
    type: "RECEIVE_TOP_NEWS",
    isFetching: false,
    errorTopNews: false,
    topNews:  topNews 
})

export const errorTopNews = () => ({
    type: "ERROR_TOP_NEWS_REPORT",
    isFetching: false,
    errorTopNews: true
})

export function fetchTopNews() {
    return dispatch => {
        dispatch(requestTopNews())
        return fetch(`http://localhost:3001/api/news`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        }).then(response => response.json())
            .then(json => dispatch(receiveTopNews(json)))
            .catch(error => dispatch(errorReport()))
    }
}


function mustFetchTopNews(state) {
    const news = state.topNews;
    if ( news.length > 0) {
        return false;
    }
    return true;
}

export function topNewsFetchIfNeed() {
    return (dispatch, getState) => {
        if (mustFetchTopNews(getState())) {
            return dispatch(fetchTopNews());
        }
    }
}

export const chooseTheme = (type) => ({
    type: "CHANGE_THEME",
    light: type
})