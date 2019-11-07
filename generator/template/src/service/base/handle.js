/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */

export default function (Vue) {
    //根据code码弹出对应提示信息
    Vue.$codeMessage = Vue.prototype.$codeMessage = function (code, cb) {
        switch (code) {
            case 0:
                console.log(Vue.const.MSG.SUCCESS);
                break;
            case 600:
                // cancel request
                break;
            default:
                if (typeof cb === "function") {
                    cb();
                } else {
                    console.log(Vue.const.MSG.ERROR);
                }
        }
    }

}
