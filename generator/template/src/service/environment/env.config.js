/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/7/20
 * ======================================== */

let urlPrefix = '/dev_test'

let vars = {}
switch (process.env.NODE_ENV) {
    case 'development':
        vars.baseUrl = urlPrefix  //这里是本地的请求url
        vars.routerBase = '/app/'
        vars.websocket_port = 9001
        break
    case 'production':
        vars.baseUrl = "/"   //生产环境url
        vars.routerBase = "/"
        vars.websocket_port = 9000
        break
}

export default {
    ...vars
}
