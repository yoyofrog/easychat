import React, {Component} from 'react'
import {WingBlank,WhiteSpace, Button, List, InputItem, NavBar} from "antd-mobile";

import Logo from '../../components/logo/logo'

export default class Login extends Component{
    state= {
        username: '',
        password: '',
    }
    changeHandle= (name, val) => {
        this.setState({
            [name] : val
        })
    }
    submitHandle = ()=>{
        console.log(this.state)
    }
    toRegister =()=> {
        this.props.history.replace('/register')
    }
    render() {
        return(
            <div>
                <NavBar>Welcome</NavBar>
                <Logo/>
                <WingBlank>
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