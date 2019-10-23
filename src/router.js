
import VueRouter from 'vue-router'

import login from './components/login.vue'
import home from './components/home.vue'
import userIndex from './components/userindex'
import bookDetail from './components/bookdetail'
import bookRead from './components/bookread'
import author from './components/author'
import edit from './components/edit'

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/login', component: login, name: 'login' },
        { path: '/home', component: home, name: 'home' },
        { path: '/userIndex', component: userIndex, name: 'userIndex' },
        { path: '/bookDetail:bookId', component: bookDetail, name: 'bookDetail' },
        { path: '/bookread', component: bookRead, name: 'bookRead' },
        { path:'/author',component:author,name:'author'},
        { path:'/edit:bookId',component:edit,name:'edit' }
    ]
})



export default router
