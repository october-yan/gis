import '../components/app.less'
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { HomePage, ComponentPage, TransportationPage, QuestionPage  } from "./components.js";

export default class ROOT extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter basename="/">
            <div>
              <Route path="/" component={HomePage} exact />
              <Route path="/component" component={ComponentPage} />
              <Route path="/transportation" component={TransportationPage} />
              <Route path="/question" component={QuestionPage} />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}