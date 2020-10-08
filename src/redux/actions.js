import { reqRegister, reqLogin} from "../api";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type:ERROR_MSG, data: msg})

export function register(user) {
    const{username, password, password2, type} = user
    if (!username) {
        return errorMsg('用户名不能为空')
    } else if (password !== password2) {
        return errorMsg('2次密码不一致')
    }

    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data
        if(result.code === 0 ){
            //分发成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export function login(user) {
    const{username, password } = user
    if (!username) {
        return errorMsg('用户名不能为空')
    } else if (!password) {
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0 ){
            //分发成功的同步action
            dispatch(authSuccess(result.data))

        } else {
            // 失败
             dispatch(errorMsg(result.msg))
        }
    }
}