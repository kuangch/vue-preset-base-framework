/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/7/20
 * ======================================== */

const util = require('./utils')

const pagePaths = []
util.getPagePaths().forEach(function (item) {
    item !== '/' && pagePaths.push(item)
})

let devServer = {

    //api代理，开发阶段使用（如用于调试的跨域访问接口）
    proxy: {
        '/dev_test': {
            target: 'http://10.0.1.50:8888/',
            changeOrigin: true,
            pathRewrite: {
                '^/dev_test': '',     // rewrite path
            },
        }
    },

    // 开发环境下的路由404处理（线上环境的nginx try_files配置）
    historyApiFallback: {
        rewrites: pagePaths.map(pagePath => {
            return {from: RegExp(`^${pagePath}`), to: `${pagePath}`}
        })
    }

}

module.exports = devServer