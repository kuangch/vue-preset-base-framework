/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/26
 * ======================================== */
let vars = {}

vars.INFO = {
  VERSION: 'V0.1'
}
vars.MSG={
  ERROR:'失败',
  SUCCESS:'成功',
};
export default function (Vue) {
  Vue.const = Vue.prototype.const = vars

}
