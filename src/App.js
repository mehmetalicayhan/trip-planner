import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from "./components/register";
import Main from './components/layout';
import PrivateRoute from './components/PrivateRoute';
import CreateBlog from "./components/blog/create-blog";
import BlogDetail from "./components/blog/blog-detail";

const App = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" component={() => <Main type={`Main`}/> }/>
                    <PrivateRoute exact path="/user/:id" component={(props) => <Main type={`Main`} key={Math.floor(Math.random()*1000)} {...props}/> }/>
                    <PrivateRoute exact path="/create-blog/:id" component={(props) => <CreateBlog {...props}/> }/>
                    <PrivateRoute exact path="/blog/:id" component={(props) => <BlogDetail {...props}/> }/>
                    <PrivateRoute exact path="/followers/:id" component={(props) => <Main type={`Follower`} {...props}/> }/>
                    <PrivateRoute exact path="/following/:id" component={(props) => <Main type={`Following`} {...props}/> }/>
                    <PrivateRoute exact path="/add-trip/:id" component={(props) => <Main type={`AddTrip`} {...props}/> }/>
                    <PrivateRoute exact path="/user/:userId/step/:tripId" component={(props) => <Main type={`Step`}  {...props}/> }/>
                    <Route path="/account/login" component={Login}/>
                    <Route path="/account/register" component={Register}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;