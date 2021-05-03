import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from "./components/register";
import Main from './components/layout';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';

const App = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" component={() => <Main type={`Main`}/> }/>
                    <PrivateRoute exact path="/followers" component={() => <Main type={`Follower`}/> }/>
                    <PrivateRoute exact path="/add-trip" component={() => <Main type={`AddTrip`}/> }/>
                    <PrivateRoute exact path="/step/:id" component={(props) => <Main type={`Step`} {...props}/> }/>
                    <Route path="/account/login" component={Login}/>
                    <Route path="/account/register" component={Register}/>
                    <PrivateRoute path="/about" component={About}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;