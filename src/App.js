import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

///Theme import
import { ThemeProvider } from "@material-ui/core/styles";
import { lightTheme } from "./app/lightTheme";

//Authority
import AdminRoute from "./components/AdminRoute";

//Layout
import Login from "./layout/Login";
import Register from "./layout/Register";
import Dashboard from "./layout/Dashboard";

export const history = createBrowserHistory();

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={lightTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>

            <AdminRoute exact path="/" component={Dashboard}></AdminRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
