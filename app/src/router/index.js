import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/landing/Main'

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/',
            component: Main
        },
    ]
})
