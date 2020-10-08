import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import Login from './container/login/login'
import Register from "./container/register/register";
import Main from "./container/main/main";

import './assets/css/index.css'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
    ), document.getElementById('root'));

