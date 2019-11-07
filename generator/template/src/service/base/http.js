/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

import axios from 'axios'
import vueAxios from 'vue-axios'
import ENV from '../environment/env.config'
const application =  require('../../application')

axios.defaults.baseURL = ENV.baseUrl + application.http_request_prefix
axios.defaults.timeout = 1000 * 10

//声明一个用于存储每个ajax请求的取消函数和ajax标识的对象
const pendingRequests = {};

// 请求拦截（取消重复请求）
axios.interceptors.request.use(function (config) {

    // 取消重复请求
    if (pendingRequests[config.url]) {
        pendingRequests[config.url](config.url)
        console.log('request cancel start: '+ config.url)
    }

    // 记录请求token和对应的取消api
    config.cancelToken = new axios.CancelToken(function (cancel) {
        pendingRequests[config.url] = cancel
    })
    return config

}, function (error) {
    return Promise.reject(error)
})

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
    delete pendingRequests[response.config.url]
    return response;
}, function (error) {

    // 处理取消的请求
    if(axios.isCancel(error)){
        console.log('request cancel: ' + error.message)
        delete pendingRequests[error.message]
        return Promise.reject({
            code: 600,
            msg: 'request cancel: ' + error.message
        })
    }
    // 处理响应失败
    if (error.response&&error.response.status === 401) {
        console.warn('未登录,或者登录失效')
        // 未授权跳转到登录页
        window.location.href = '/?redirect=true'
    }
});

/**
 * 取消所有请求
 */
axios.$cancelAll = function () {
    for(let pendingRequest in pendingRequests){
        pendingRequests[pendingRequest](pendingRequest)
    }
}

export default function (Vue) {
    Vue.$http = axios
    Vue.use(vueAxios,axios)
}
