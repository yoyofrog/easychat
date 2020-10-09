import React, {Component} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from "../laoban-info/laoban-info";
import {getRedirect} from "../../utils";
import {getUser} from '../../redux/actions'

class Main extends Component{
    componentDidMount() {
        const userid = Cookies.get('userid')
        const{_id} = this.props.user
        if(userid && !_id) {
           this.props.getUser()
        }
    }

    render() {
        const userid = Cookies.get('userid')
        //判断有没有cookie的userid
        if (!userid) {
            return <Redirect to={'/login'}/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果user没有_id,返回null
        if(!user._id) {
            return null
        } else {
            //如果有_id,显示对应界面
            //如果请求路径，根据user的 type和header来计算出要给重定向的路由路径并自动重定向
            let path = this.props.location.pathname
            if (path ==='/') {
                path = getRedirect(user.type, user.header)
                return <Redirect to={path}/>
            }
        }
        //检查用户是否登录，如果没有自动重定向到登录界面
        // const {user} = this.props
        //     if (!user._id) {
        //         return <Redirect to={'/login'}/>
        //     }
        return(
            <div>
                <Switch>
                    <Route path='/dasheninfo' component={DashenInfo}></Route>
                    <Route path='/laobaninfo' component={LaobanInfo}></Route>
                </Switch>
            </div>
        )
    }
}

export default connect(state => ({user: state.user}),{getUser})(Main)