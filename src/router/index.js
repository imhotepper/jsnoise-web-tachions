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
  routes: [
    {
      path: '/',
      name: 'root',
      component: Podcasts
    },
    {
      path: '/p=:p?&q=:q?',
      name: 'podcasts',
      component: Podcasts,
      props:true
    },
    {
      path:'/podcasts/:id',
      component: Podcast,
      props:true
    },
    {
      path:'/admin/producers',
      name:'producers',
      component: Producers
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
      path:'*',
      component:Podcasts
    }
  ]
})
