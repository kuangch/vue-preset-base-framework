/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

export default function (Vue) {

    /**
     * 登录校验
     * @type {$login}
     */
    Vue.$login = Vue.prototype.$login = function () {

        // 路由的登录校验，由于是nginx静态部署，需要一个接口获取登录状态的session
        // Vue.axios.get('/user/loginVerify')
        return true
    }
}
