import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from "antd-mobile";
import {connect} from 'react-redux'
import { register} from "../../redux/actions";
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo/logo'


const ListItem = List.Item

class Register extends Component{
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'
        }
    static propTypes = {
        user: PropTypes.object.isRequired,
        register:PropTypes.func.isRequired,
    }

    handleChange= (name, val) => {
        this.setState({[name]: val})//放在中括号里面，属性名不是name, 而是name的值
    }
    register =()=> {
        this.props.register(this.state)
    }
    toLogin = ()=> {
        this.props.history.replace('/login')
    }

    render() {
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>Register</NavBar>
                <Logo/>
                <WingBlank>
                    {msg ? <div className='error-msg'>{msg}</div>:""}
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名：   </InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请输入密码' onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码：   </InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请确认密码' onChange={val => {this.handleChange('password2', val)}}>确认密码：   </InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type ==='dashen'} onChange={() => this.handleChange('type','dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type ==='laoban'} onChange={() => this.handleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}

export default connect(state => ({user: state.user}), {register})(Register)