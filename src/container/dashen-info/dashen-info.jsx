import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, InputItem, NavBar,TextareaItem} from "antd-mobile";
import PropType from 'prop-types'
import {Redirect} from 'react-router-dom'

import HeaderSelector from "../../components/header-selector/header";
import {update} from "../../redux/actions";

class DashenInfo extends Component {
    static propTypes ={
        user:PropType.object.isRequired,
        update:PropType.func.isRequired
    }
    state = {
        post:'',
        info:'',
        header:''
    }

    changeHandle=(name, val)=> {
        this.setState({
            [name]: val
        })
    }
    save=()=>{
       this.props.update(this.state)
    }
    setHeader =(val)=> {
        this.setState({
            header: val
        })
    }

    render() {
        const { header} = this.props.user
        if (header) {
            return (<Redirect to={'dashen'}/>)
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={(val)=> {this.changeHandle('post',val)}}>求职岗位：</InputItem>
                <TextareaItem rows={3} title='个人介绍'  onChange={(val)=> {this.changeHandle('info',val)}}></TextareaItem>
                <Button onClick={this.save} type={'primary'}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),{update}
)(DashenInfo)