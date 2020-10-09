import {reqRegister, reqLogin, reqUpdate, reqUser} from "../api";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from "./action-types";

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser =(user)=> ({type:RECEIVE_USER, data: user})
const resetUser =(msg)=> ({type: RESET_USER, data:msg})

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
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }

}