/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */

import ENV from '../environment/env.config'
let vars = {}

const io = require ('socket.io-client')

vars.io = io(`http://${window.location.hostname}:${ENV.websocket_port}/notification_push`)

// socket 协议
vars.PROTOCOLS = {
  ONE: "ONE"
}

export default {
    ...vars
}
