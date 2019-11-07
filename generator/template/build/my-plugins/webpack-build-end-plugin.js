/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/9
 * ======================================== */

function BuildEndPlugin(doneCallback) {
    this.doneCallback = doneCallback || function(status){}
}

BuildEndPlugin.prototype.apply = function (compiler){
    const _this = this
    compiler.plugin('done',(status) => {
        _this.doneCallback(status)
    })
}

module.exports = BuildEndPlugin