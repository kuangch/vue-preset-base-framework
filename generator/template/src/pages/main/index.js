import Vue from 'vue'
import App from './App.vue'
import Base from '../../service/base'
import router from './router'

Vue.config.productionTip = false
Vue.use(Base)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
