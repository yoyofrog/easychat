import React, {Component} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from "antd-mobile";

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from "../laoban-info/laoban-info";
import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Dashen from "../dashen/dashen";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/notFound";
import NavFooter from "../../components/nav-footer/navFooter";

import {getRedirect} from "../../utils";
import {getUser} from '../../redux/actions'


class Main extends Component {
    navList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            this.props.getUser()
        }
    }

    render() {
        const {navList} = this
        const userid = Cookies.get('userid')
        let path = this.props.location.pathname
        //判断有没有cookie的userid
        if (!userid) {
            return <Redirect to={'/login'}/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果user没有_id,返回null
        if (!user._id) {
            return null
        } else {
            //如果有_id,显示对应界面
            //如果请求路径，根据user的 type和header来计算出要给重定向的路由路径并自动重定向
            if (path === '/') {
                path = getRedirect(user.type, user.header)
                return <Redirect to={path}/>
            }
        }
        //检查用户是否登录，如果没有自动重定向到登录界面
        // const {user} = this.props
        //     if (!user._id) {
        //         return <Redirect to={'/login'}/>
        //     }
        const currentNav = navList.find(nav => nav.path === path)
        if (currentNav) {
            if(user.type ==='laoban') {
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav? <NavBar className='top-nav'>{currentNav.title}</NavBar>: null}
                <Switch>
                    <Route path='/dasheninfo' component={DashenInfo}></Route>
                    <Route path='/laobaninfo' component={LaobanInfo}></Route>
                    {navList.map((nav, index)=> {
                        return <Route key={index} path={nav.path} component={nav.component}/>
                    })}
                    <Route component={NotFound}></Route>
                </Switch>
                 {currentNav? <NavFooter navList={navList}/>: null}
            </div>
        )
    }
}

export default connect(state => ({user: state.user}), {getUser})(Main)