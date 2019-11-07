#!/usr/bin/env node
const path = require('path')
const semver = require('semver')
const { error } = require('@vue/cli-shared-utils')
const requiredVersion = require('../../node_modules/@vue/cli-service/package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require(path.resolve(__dirname, '../../node_modules/@vue/cli-service/lib/Service'))
const service = new Service(path.resolve(__dirname, '../../'))

let command = 'build'
let args = { _: [ 'build' ],
    modern: false,
    report: true,
    'report-json': false,
    watch: false,
    open: false,
    copy: false,
    https: false,
    verbose: false,
    mode: 'production'
}
// let p = path.resolve(__dirname, './webpack.debug.conf')
let rawArgv = ['build','--mode', 'production']
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
