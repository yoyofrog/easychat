import { combineReducers} from "redux";
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    READ_MSG
} from "./action-types";
import {getRedirect} from '../utils/index'

const initUser = {
    username: '',
    type: '',
    msg:'',
    redirectTo: ''
}

const user =(state= initUser, action)=> {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data
            return {...action.data, redirectTo: getRedirect(type, header)}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []
const userList =(state = initUserList , action)=> {
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }

}
// 产生聊天状态reducer
const initChat ={
    users: {},
    chatMsgs: [],
    unReadCount: 0

}
function chat(state=initChat, action) {
    switch(action.type){
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid? 1: 0)
            }
        case RECEIVE_MSG_LIST:
            let {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to ===userid? 1: 0), 0 )}
        case READ_MSG:
            const {from, to, count} = action.data

            return {
                users:state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }


}


export default combineReducers({user, userList, chat})