import { connect } from 'react-redux';
import {
    fetchArticlesIfNeed,
    topNewsFetchIfNeed,
    searchArticlesByDate,
    chooseTheme
} from './actions/index';
import { ArticlesPage } from './components/ArticlesPage';
import { SportPage, SciecePage, TechnologyPage } from './components/TopNews';
import { FormComponent } from './components/Form';
import { AppComponent } from './components/App';
import { HeaderComponent } from './components/Header';
import {
    ForArticlesPage,
    ForFormPage,
    ForTopNewsPage
} from './components/Cards';

const mapLightPropFromStore = (store) =>({
    light: store.light,
})

export const App = connect(
    mapLightPropFromStore,
    dispatch => ({
        fetchArticlesIfNeed: () => { dispatch(fetchArticlesIfNeed()) },
        topNewsFetchIfNeed: () => { dispatch(topNewsFetchIfNeed()) }
    })
)(AppComponent)

export const Articles = connect(
    store => ({
        articles: store.content.articles,
        error: store.errorMyArticles,
    })
)(ArticlesPage)

export const Header = connect(
    mapLightPropFromStore,
    dispatch => ({
        chooseTheme: type => { dispatch(chooseTheme(type)) },
    })
)(HeaderComponent)


export const Technology = connect(
    store => ({
        news: store.topNews.technology.articles,
        error: store.errorTopNews,
    })
)(TechnologyPage)

export const Science = connect(
    store => ({
        news: store.topNews.science.articles,
        error: store.errorTopNews,
    })
)(SciecePage)

export const Sports = connect(
    store => ({
        news: store.topNews.sports.articles,
        error: store.errorTopNews,
    })
)(SportPage)

export const Form = connect(
    store => ({
        articles: store.content.dateSearch,
        error: store.errorSearch
    }),
    dispatch => ({
        fetchArticlesIfNeed: () => { dispatch(fetchArticlesIfNeed()) },
        searchArticlesByDate: (date) => { dispatch(searchArticlesByDate(date)) },
    })
)(FormComponent)

export const CardForFormPage = connect(
    mapLightPropFromStore,
)(ForFormPage)

export const CardForArticlesPage = connect(
    mapLightPropFromStore,
)(ForArticlesPage)

export const CardForTopNewsPage = connect(
    mapLightPropFromStore,
)(ForTopNewsPage)