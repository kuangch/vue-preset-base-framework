/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/11/20
 * ======================================== */
import Vue from 'vue'
import VueRouter from 'vue-router'
import router_child_view from './router_child_view'
import a from './a'
import b from './b'
import c2 from './c2'
import c_1 from './c_1'
import c_2 from './c_2'

const packageJson = require('../../../../package')

const routerList = [{
    path: `/${packageJson.name}/`,
    name: 'a',
    component: a,
    meta: {
        requiresAuth: true
    }
},
    {
        path: `/${packageJson.name}/b`,
        name: 'b',
        component: b,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: `/${packageJson.name}/c`,
        name: 'c',
        component: router_child_view,
        children: [
            {
                path: `/${packageJson.name}/c/1`,
                name: 'c_1',
                component: c_1,
                meta: {
                    requiresAuth: true
                }
            },
            {
                hidden: APP_CONFIG.HIDDEN_C2,
                path: `/${packageJson.name}/c/2`,
                name: 'c_2',
                component: c_2,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        hidden: APP_CONFIG.HIDDEN_C2,
        path: `/${packageJson.name}/c2`,
        name: 'c2',
        component: c2,
        meta: {
            requiresAuth: true
        }
    },
];
for (let i = 0; i < routerList.length; i++) {
    if (routerList[i].hidden) {
        routerList.splice(i, 1);
        i--;
        continue;
    }
    if (routerList[i].children) {
        for (let j = 0; j < routerList[i].children.length; j++) {
            if (routerList[i].children[j].hidden) {
                routerList[i].children.splice(j, 1);
                j--;
            }
        }
    }
}
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    // base: `${ENV.routerBase}`,
    routes: [
        {
            path: '/',
            redirect: `/${packageJson.name}/`
        },
        ...routerList
    ]
})

/**
 * 校验登录状态
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.$login()) {
            window.location.href = '/'
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

router.afterEach((to, from) => {
    Vue.axios.$cancelAll()
})

export default router
export {
    routerList
}

