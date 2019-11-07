/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */

import ENV from '../environment/env.config'

let vars = {}

// 这是一个socket.io-client的bug，由于 socket.io-client package.json的main指向了 lib/index 开发代码，
// 而不是生产代码dist/socket.io.js, 在打包后socket.io的source map相关调试代码被append到打包完成的代码中（含有es6）
// 在不支持es6的浏览器中会报错
const io = require('socket.io-client/dist/socket.io')

vars.io = io(`http://${window.location.hostname}:${ENV.websocket_port}/notification_push`)

// socket 协议
vars.PROTOCOLS = {
    ONE: "ONE"
}

export default {
    ...vars
}
