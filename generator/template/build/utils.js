/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/8
 * ======================================== */
const projectName = require('../package.json').name
const glob = require('glob')
const path = require('path')
const fs = require('fs');
const childProcess = require('child_process');

/**
 * 获取页路径
 * @returns {Array}
 */
function getPageFiles() {
    const PAGES_PATH = path.resolve(__dirname, '../src/pages')
    const pageFiles = []
    glob.sync(PAGES_PATH + '/*/index.js').forEach(filepath => {
        pageFiles.push(filepath)
    })
    return pageFiles
}


/**
 * 生成所有主页entry
 * @returns {Array}
 */
function getPagePaths() {
    const pagePaths = []
    getPageFiles().forEach(filepath => {
        let pageName = path.basename(path.dirname(filepath))
        let pagePath = `/${projectName}/${pageName}/`
        switch (pageName) {
            case 'main':
                pagePath = `/${projectName}/`
                break
            case 'login':
                pagePath = '/'
                break

        }

        pagePaths.push(pagePath)
    })

    return pagePaths
}

/**
 * 注入版本号信息到模板中去
 * @param filePath
 */
function injectVersionInfo(filePath) {

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.log('file read error!');
            throw err;
        }
        let time = (new Date()).toLocaleString()
        let version = getGitTag()

        let versionStr = ''
        versionStr += `┌─────────────────────────────\\n`
        versionStr += `│ Version : ${version}\\n`
        versionStr += `│ Time    : ${time}\\n`
        versionStr += `│ Author  : kuangch\\n`
        versionStr += `└─────────────────────────────`

        const reg = /<script id=version>[\s\S]*?<\/script>/

        let templateWidthVersionInfo = data.replace(reg, `<script id=version>console.log('${versionStr}')<\/script>`)

        console.log(templateWidthVersionInfo)
        fs.writeFile(filePath, templateWidthVersionInfo, {flag: 'w', encoding: 'utf-8', mode: '0666'}, function (err) {
            if (err) {
                console.log("版本号修改失败")
                console.error(err)
            } else {
                console.log("版本号修改成功");
            }
        })
    });
}

/**
 * 获取git tag版本号
 * @returns {string|string}
 */
function getGitTag() {

    let v = ''
    try {
        v = childProcess.execSync('git describe --tags').toString().replace(/\n/, '')
    } catch (err) {
        console.error(err)
    }
    return v || 'develop'
}

module.exports = {
    getPageFiles,
    getPagePaths,
    injectVersionInfo
}