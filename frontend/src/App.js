import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";
import MovieDetail from "./components/MovieDetail";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:query" render={(props) => (
  <SearchResult key={props.match.params.query} {...props} />)} />
          <Route exact path="/movie/:id" component={MovieDetail} />
          <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;

