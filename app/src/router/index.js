import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/landing/Main'
import Landing from '@/pages/landing/Landing'

Vue.use(Router)

export default new Router({
    routes: [
    
        {
            path: '/',
            component: Main,
            children:[
                {
                    path: '',
                    component: Landing
                },
            ]
        },
    ]
})
