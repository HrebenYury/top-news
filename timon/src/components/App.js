import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArticlesIfNeed, topNewsFetchIfNeed } from "../actions/index";

import NotFound from "./NotFoud";
import Technology from "./TechnologyNews";
import Science from "./TopNews";
import Sports from "./SportNews";
import Header from "./Header";
import Articles from "./ArticlesPage";
import Form from "./Form";

export class App extends React.Component {
  fetching = () => {
    let { fetchArticlesIfNeed, topNewsFetchIfNeed } = this.props;
    topNewsFetchIfNeed();
    fetchArticlesIfNeed();
  };

  componentDidMount() {
    this.fetching();
  }

  render() {
    document.body.className = this.props.light
      ? "bodyBlackTheme"
      : "bodyWhiteTheme";
    return (
      <div>
        <HashRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/articles" component={Articles} />
            <Route path="/sports" component={Sports} />
            <Route path="/science" component={Science} />
            <Route path="/technology" component={Technology} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    light: store.light,
  }),
  (dispatch) => ({
    fetchArticlesIfNeed: () => {
      dispatch(fetchArticlesIfNeed());
    },
    topNewsFetchIfNeed: () => {
      dispatch(topNewsFetchIfNeed());
    },
  })
)(App);
