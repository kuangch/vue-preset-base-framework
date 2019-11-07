const settings = require('./config')

const devServer = require('./build/dev-server')
const css = require('./build/css-loader')
const pages = require('./build/multi-page')
const addPlugins = require('./build/plugins-add')
const moduleRule = require('./build/module-rule')
const splitChunk = require('./build/chunk-split')

module.exports = {

    outputDir: settings.outputDir,
    devServer,
    css,
    pages,

    // 链式配置
    chainWebpack:(config) =>{

        // config.module.set('noParse',
        //     /^(vue|vue-router|vuex|vuex-router-sync|element-ui|axios|three)$/)

        config.devtool(process.env.NODE_ENV === 'production'? "cheap-module-source-map": "cheap-module-eval-source-map")

        // 配置代码分割
        splitChunk(config)

        // 配置各种自定义rules规则
        moduleRule(config)

        // 配置plugins
        addPlugins(config)
    },

}