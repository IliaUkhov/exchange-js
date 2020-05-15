import React from 'react';
import './App.css';
import LoginView from "./Login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import store from "./Store";

const Provider = require("react-redux").Provider;

class App extends React.Component {
  render ()	{
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Redirect exact path="/" to="/login"/>
            <Route exact path='/login' component={LoginView}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/admin' component={AdminDashboard}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
