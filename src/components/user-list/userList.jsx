import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank } from "antd-mobile";
import  {withRouter} from 'react-router-dom'


class UserList extends Component{
    static propsTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props
        return(
            <div className='top-space'>
                <WingBlank>
                {userList.map((user)=> {
                    return(
                        <div key={user._id}>
                        <WhiteSpace/>
                        <Card onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}>
                            <Card.Header
                            thumb={user.heaser ? require(`../../assets/images/${user.header}.png`): null}
                            extra={user.username}/>
                            <Card.Body>
                                <div>职位：{user.post}</div>
                                {user.company? <div>公司：{user.company}</div>: ''}
                                {user.salary? <div>薪资：{user.salary}</div>: ''}
                                {user.info? <div>描述：{user.info}</div>: ''}
                            </Card.Body>
                        </Card>
                       </div>
                    )
                })}
                </WingBlank>
            </div>
        )
    }
}
export default withRouter(UserList)