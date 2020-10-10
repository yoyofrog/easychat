import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import  Cookies from 'js-cookie'

import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert
class Personal extends Component{
    logout=() => {
        alert('退出', '确定退出?', [
          { text: '取消' },
          { text: '确认', onPress: () => {
                  Cookies.remove('userid')
                  this.props.resetUser()
              } },
        ])
    }
    render() {
        const {username, info, header, company, post, salary} = this.props.user
        return(
            <div className='top-space'>
                <Result img={<img src={require(`../../assets/images/${header}.png`)}/>} title={username} message={company}/>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary? <Brief>薪资：{salary}</Brief>: ''}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button onClick={this.logout} type={'warning'}>退出</Button>
                </List>
            </div>
        )

    }
}
export default connect(state => ({user: state.user}),{resetUser})(Personal)