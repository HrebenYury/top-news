import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';

import NotFound from './NotFoud';
import {
  Articles,
  Sports,
  Form,
  Science,
  Technology,
  Header
} from "../mainContainer";

export class AppComponent extends React.Component {

  fetching = () => {
    let { fetchArticlesIfNeed, topNewsFetchIfNeed } = this.props;
    topNewsFetchIfNeed();
    fetchArticlesIfNeed();
  }

  componentDidMount() {
    this.fetching();
  }

  render() {
    document.body.className = this.props.light ? "bodyBlackTheme" : "bodyWhiteTheme"
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
    )
  }
}