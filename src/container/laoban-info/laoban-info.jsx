import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, InputItem, NavBar, TextareaItem } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import HeaderSelector from '../../components/header-selector/header'
import {update} from "../../redux/actions";


class LaobanInfo extends Component {
    static propTypes ={
        user: PropTypes.object.isRequired,
        update:PropTypes.func.isRequired
    }
    state = {
        header: '',
        post: '',
        info: '',
        company:'',
        salary:'',
    }
    setHeader =(val)=> {
        this.setState({
            header: val
        })
    }
    changeHandle=(name, val)=> {
        this.setState({
            [name]: val
        })
    }
    save=()=>{
        this.props.update(this.state)
    }

    render() {
        const {type, header} = this.props.user
        if (header) {
            return (<Redirect to='/laoban'/>)
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入招聘职位' onChange={(val)=> {this.changeHandle('post',val)}}>招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={(val)=> {this.changeHandle('company',val)}}>公司名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={(val)=> {this.changeHandle('salary',val)}}>职位薪资：</InputItem>
                <TextareaItem rows={3} title='职位要求'  onChange={(val)=> {this.changeHandle('info',val)}}></TextareaItem>
                <Button onClick={this.save} type={'primary'}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),{update}
)(LaobanInfo)