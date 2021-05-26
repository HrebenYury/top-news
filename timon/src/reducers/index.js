export const initialState = {
    content: {},
    topNews: {},
    isFetching: false,
    errorMyArticles: false,
    errorTopNews: false,
    errorSearch: false,
    light: false,
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_ARTICLES":
            return { ...state, isFetching: action.isFetching, errorMyArticles: action.errorMyArticles }
        case "RECEIVE_ARTICLES":
            return {
                ...state,
                isFetching: action.isFetching,
                errorMyArticles: action.errorMyArticles,
                content: {
                    ...state.content,
                    ...action.articles
                }
            }
        case "ERROR_MY_ARTICLES_REPORT":
            return { ...state, isFetching: action.isFetching, errorMyArticles: action.errorMyArticles }

        case "REQUEST_SEARCH_DATE":
            return { ...state, isFetching: action.isFetching }
        case "RECEIVE_SEARCH_DATE":
            return {
                ...state,
                isFetching: action.isFetching,
                errorSearch: action.errorSearch,
                content: {
                    ...state.content,
                    ...action.dateSearch
                }
            }
        case "ERROR_SEARCH_DATE_REPORT":
            return { ...state, isFetching: action.isFetching, errorSearch: action.errorSearch }

        case "REQUEST_TOP_NEWS":
            return { ...state, isFetching: action.isFetching }
        case "RECEIVE_TOP_NEWS":
            return {
                ...state,
                isFetching: action.isFetching,
                errorTopNews: action.errorTopNews,
                topNews: {
                    ...action.topNews
                }
            }
        case "ERROR_TOP_NEWS_REPORT":
            return { ...state, isFetching: action.isFetching, errorTopNews: action.errorTopNews }
            
        case "CHANGE_THEME":
            return { ...state, light: action.light }
        default:
            return state
    }
}