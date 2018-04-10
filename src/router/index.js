import Vue from 'vue'
import Router from 'vue-router'
import Podcasts from '@/pages/Podcasts'
import Producers from '@/pages/Producers'
import FeedTester from '@/pages/FeedTester'
import Login from '@/pages/Login'
import Podcast from '@/pages/Podcast'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'root',
      component: Podcasts
    },
    {
      path:'/podcasts/:id',
      component: Podcast,
      props:true
    },
    {
      path:'/admin/producers',
      name:'producers',
      component: Producers,
      beforeEnter(to, from, next){
        var isAuth = localStorage.getItem("auth")||"";        
        if ((isAuth.length > 0)) next();
        else next("/login");
      }      
    },
    {
      path:'/admin/test',
      name:'feedTester',
      component: FeedTester
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/logout',
      name:'Logout',
      beforeEnter(to, from, next){
          localStorage.setItem("auth","");
          next("/");
      }
    },
    {
      path:'*',
      component:Podcasts
    }
  ]
})
