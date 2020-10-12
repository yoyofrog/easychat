import io from 'socket.io-client'

import {reqRegister, reqLogin, reqUpdate, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from "../api";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, READ_MSG} from "./action-types";


const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid} })
// 接收消息的同步action
const receiveMsg =(chatMsg, userid) => ({type: RECEIVE_MSG, data:{chatMsg, userid}})
const readMsg = ({count, from, to})=> ({type: READ_MSG, data:{count, from, to}})


async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const{ users, chatMsgs } = result.data
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

export function register(user) {
    const {username, password, password2, type} = user
    if (!username) {
        return errorMsg('用户名不能为空')
    } else if (password !== password2) {
        return errorMsg('2次密码不一致')
    }

    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            //分发成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export function login(user) {
    const {username, password} = user
    if (!username) {
        return errorMsg('用户名不能为空')
    } else if (!password) {
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        const response = await reqLogin({username, password})
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            //分发成功的同步action
            dispatch(authSuccess(result.data))

        } else {
            // 失败
            dispatch(errorMsg(result.msg))
        }
    }
}

export function update(user) {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export function getUser() {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export function getUserList(type) {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

//通信功能
//单例对象
// 1.创建对象之前：判断对象是否存在，
// 2.创建对象之后保存对象
/*初始化客户端 socketio
1. 连接服务器
2. 绑定用于接收服务器返回 chatMsg 的监听
*/
function initIO(dispatch, userid) {
    // .创建对象之前：判断对象是否存在，
    if (!io.socket) {
        io.socket = io('ws://localhost:4000') //创建对象之后保存对象
        io.socket.on('receiveMsg', (chatMsg) => {
            console.log('客户端收到信息',chatMsg)
            //只有当chatMsg是与当前用户相关的消息，采取分发同步action保存消息
            if (userid === chatMsg.from|| userid ===chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}

export function sendMsg({from, to, content}) {
    return async dispatch => {
        initIO()
        io.socket.emit('sendMsg', {from, to, content})
    }

}

export function msgRead(targetId, userId) {
    return async dispatch => {
        const response = await reqReadMsg(targetId)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            const from = targetId
            const to = userId
            dispatch(readMsg({count, from, to}))
        }

    }


}