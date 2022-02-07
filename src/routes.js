import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Profile from './components/Profile.vue'
import Dashboard from './components/Dashboard.vue'
import {createWebHistory,createRouter} from 'vue-router'

const routes = [
    { name:'Home',component:Home,path:'/'},
    { name:'about',component:About,path:'/about'},
    { name:'contact',component:Contact,path:'/contact'},
    { name:'profile',component:Profile,path:'/profile'},
    { name:'signup',component:SignUp,path:'/signup'},
    { name:'login',component:Login,path:'/login'},
    { name:'Dashboard',component:Dashboard,path:'/dashboard'},

]

const router = createRouter({history:createWebHistory(),routes})

export default router