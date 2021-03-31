import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from "./components/register";
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';

const App = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/account/login" component={Login}/>
                    <Route path="/account/register" component={Register}/>
                    <PrivateRoute path="/about" component={About}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;