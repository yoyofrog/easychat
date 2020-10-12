import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/*得到所有聊天的最后 msg 组成的数组
[msg1, msg2, msg3..]
// 1. 使用{}进行分组(chat_id), 只保存每个组最后一条 msg: {chat_id1: lastMsg1, chat_id2:
lastMsg2}
// 2. 得到所有分组的 lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
// 3. 对数组排序(create_time, 降序)
*/
function getLastMsgs(chatMsgs, userid) {
    const lastMsgObj = {}
    chatMsgs.forEach(msg=> {

        const lastMsg = lastMsgObj[msg.chat_id]
        if (userid === msg.to && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        if (!lastMsg) {

            lastMsgObj[msg.chat_id] = msg
        } else {
             const unReadCount = lastMsgObj[msg.chat_id].unReadCount
            if (lastMsg.create_time < msg.create_time) {
                lastMsgObj[msg.chat_id] = msg
            }
            lastMsgObj[msg.chat_id].unReadCount = unReadCount + msg.unReadCount
        }
    })
    let lastMsgs = Object.values(lastMsgObj)
    lastMsgs = lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

class Message extends Component {
    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        const lastMsgs = getLastMsgs(chatMsgs, user._id)

        return (
            <div>
                <List className='top-space'>
                    { lastMsgs.map(msg => {
                        const targetUser = msg.to === user._id? users[msg.from]: users[msg.to]
                        const targetUserId  = msg.to === user._id? msg.from: msg.to
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={ targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick={()=> this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })}

                </List>
            </div>
        )

    }
}

export default connect(state => ({user: state.user, chat: state.chat}), {})(Message)