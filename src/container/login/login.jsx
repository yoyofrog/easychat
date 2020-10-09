import React, {Component} from 'react'
import {WingBlank,WhiteSpace, Button, List, InputItem, NavBar} from "antd-mobile";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component{
    state= {
        username: '',
        password: '',
    }
    static propType = {
        user: PropTypes.object.isRequired,
        login:PropTypes.func.isRequired
    }
    changeHandle= (name, val) => {
        this.setState({
            [name] : val
        })
    }
    submitHandle = ()=>{
        this.props.login(this.state)
    }
    toRegister =()=> {
        this.props.history.replace('/register')
    }
    render() {
        const {msg, redirectTo} = this.props.user
        if (redirectTo) {
           return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>Welcome</NavBar>
                <Logo/>
                <WingBlank>
                    {msg? <div className='error-msg'>{msg}</div>: ''}
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={(val) =>{this.changeHandle('username', val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' onChange={(val) =>{this.changeHandle('password', val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button onClick={this.submitHandle} type={'primary'}>登录</Button>
                        <Button onClick={this.toRegister}>新用户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(state => ({user:state.user}),{login})(Login)