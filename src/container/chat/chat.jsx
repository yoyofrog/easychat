import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'

import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state ={
        content: '',
        isShow: false
    }
    // 在第一次render()之前回调
    componentWillMount() {
        //初始化表情包数据
        const emojis = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜','🤪']
        this.emojis = emojis.map(emoji => ({text: emoji}))
        console.log(this.emojis)
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        }
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    toggleShow=()=> {
        let isShow =!this.state.isShow
        this.setState({isShow})
        if (isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    sendHandle=()=> {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if (content) {
            this.props.sendMsg({from, to, content})
            this.setState({
                isShow: false,
                content:''
            })
        }
    }
    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        const meId =user._id
        if (!users[meId]) {
            return null
        }
        //计算当前聊天的chatId

        const targetId = this.props.match.params.userid
        const chatId =[meId, targetId].sort().join('_')
        //对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg=> msg.chat_id === chatId)
        //得到目标用户的header图片对象

        const targetHeader = users[targetId].header
        const targetIcon = targetHeader? require(`../../assets/images/${targetHeader}.png`): null

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type={'left'}/>}
                    className='top-nav'
                    onLeftClick={()=> this.props.history.goBack()}>
                        {users[targetId].username}
                    </NavBar>
                <List multipleLine className='top-space'>
                    {
                        msgs.map((msg)=> {
                            if (msg.from === targetId) {
                              return (
                                <Item
                                    multipleLine align="top" wrap
                                    key={msg._id}
                                    thumb={targetIcon}
                                >
                                    {msg.content}
                                </Item>
                              )
                            } else {
                                return(
                                  <Item multipleLine align="top" wrap
                                    key={msg._id}
                                    className='chat-me item-height'
                                    extra='我'
                                >
                                     {msg.content}
                                </Item>
                                )
                            }

                        })
                    }
                </List>

                <div className='am-tab-bar '>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <div>
                                <span onClick={this.toggleShow}>😀</span>
                                <span onClick={this.sendHandle}>发送</span>
                            </div>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item)=>{this.setState({content: this.state.content + item.text,})}}
                        ></Grid>
                    ) :null}

                </div>
            </div>
        )
    }
}

export default connect(state => ({user: state.user, chat: state.chat}), {sendMsg})(Chat)