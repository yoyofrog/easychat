import React, {Component} from 'react'
import {Route, Switch, Link} from "react-router-dom";
import {NavBar} from "antd-mobile";

import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Dashen from "../dashen/dashen";



export default class Main extends Component{
    render() {
        return(
            <div>
                <Switch>
                    <Route to={'/dashen'} component={Dashen}></Route>
                    <Route to={'/laoban'} component={Laoban}></Route>
                    <Route to={'/message'} component={Message}></Route>
                </Switch>
            </div>
        )
    }
}