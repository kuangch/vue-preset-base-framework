/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/7
 * ======================================== */
const path = require('path')

// webpack构建的module rule相关配置
module.exports =  function moduleRule(webpackChainConfig) {

    // 小于2k的图片转成base64
    webpackChainConfig.module.rule('images')
        .test(/.(png|jpe?g|gif|svg)(\?\.*)?$/)
        .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign({},options, {
                    limit: 1024 * 2,
                }))

    // 压缩svg,png图片
    webpackChainConfig.module.rule('images')
        .use('img-loader')
            .loader('img-loader')
            .tap(options => Object.assign({},options, {
                plugins(context){
                    return [
                        require('imagemin-svgo')({}),
                        require('imagemin-optipng')({})
                    ]
                }
            }))

    // svg已和图片使用统一loader，清空svg的单独loader配置
    webpackChainConfig.module.rules.delete('svg')

    // 构建优化, 减少loader 检索的文件
    webpackChainConfig.module.rule('js')
        .include
            // convenience-image模块没有发布es5代码，需要babel转码
            .add(path.resolve(__dirname, "../node_modules/convenience-image"))
            .add(path.resolve(__dirname, "../src"))
            .end()

    // 构建优化，多线程转码js，提升构建性能
    /* 删掉babel loader 使用happypack/loader多线程转码js（happypack依然使用babel loader转码只是加了多线程）
     * 删掉thread-loader(vue-cli再生产环境自动添加的)使用happypack/loader多线程转码js(thread-loader和happypack功能一致) */
    webpackChainConfig.module.rule('js').uses.delete('babel-loader').delete('thread-loader')
    webpackChainConfig.module.rule('js').use('happypack/loader').loader('happypack/loader?id=js')
}