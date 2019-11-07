/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/7
 * ======================================== */
const  os = require('os')
const  util = require('./utils')

const  CompressionPlugin = require('compression-webpack-plugin')
const  ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const  ProgressBarPlugin = require('progress-bar-webpack-plugin')
const  HappyPack = require('happypack')
const  BuildEndPlugin = require('./my-plugins/webpack-build-end-plugin')

// io 密集型操作 使用2n + 1个线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length + 1 });

// webpack构建的plugins配置
module.exports =  function addPlugins(webpackChainConfig) {

    /* ------ 共有的 ------ */

    webpackChainConfig.plugin('ProgressBar').use(ProgressBarPlugin)

    // 使用babel loader 转码时使用happy pack 多线程处理提升构建性能
    webpackChainConfig.plugin('HappyPack').use(HappyPack).tap(args => {
        args[0] = {
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }
        return args
    })

    if (process.env.NODE_ENV === 'production') {
        /* ------ 生产环境独有 ------ */

        webpackChainConfig.plugin('ParallelUglify').use(ParallelUglifyPlugin).tap(args => {
            args[0] = {
                cacheDir: '.cache/',
                uglifyJS: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }
            return args
        })
        webpackChainConfig.plugin('compression').use(CompressionPlugin).tap(args => {
            args[0] = {
                test: /.(js|html|css|jpe?g|svg|ttf|eot)$/,
                // 大于4k的文件进行gzip压缩
                threshold:1024 * 4,
                deleteOriginalAssets:false
            }
            return args
        })

        webpackChainConfig.plugin('buildEnd').use(BuildEndPlugin).tap(args => {
            args[0] = function (status) {
                util.injectVersionInfo(status.compilation.assets['index.html'].existsAt)
            }
            return args
        })
    }else {
        /* ------ 开发环境独有 ------ */

    }
}