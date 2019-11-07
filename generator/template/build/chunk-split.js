/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/7
 * ======================================== */

// webpack构建的代码分割相关配置
module.exports =  function splitChunk(webpackChainConfig) {

    // 代码分割
    const commonOptions = {
        chunks: 'all',
        reuseExistingChunk: true
    }
    webpackChainConfig.optimization.splitChunks({
        // chunks: 'initial',
        // automaticNameDelimiter: '-',
        // name: true,
        cacheGroups: {
            dll: {
                test: /[\\/]node_modules[\\/](vue|element-ui|axios)[\\/]/,
                name: "chunk-vendors",
                priority: 10,
                ...commonOptions
            },

            // 这里定义的是在分离前被引用过2次以上的文件，将其一同打包到common.js中
            // common:{
            //     chunks: 'all',
            //     name: "common",
            //     minChunks: 2,
            //     minSize: 5
            // }
        }
    })
}