import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Podcasts from '@/components/Podcasts'
import Producers from '@/components/Producers'
import FeedTester from '@/components/FeedTester'
import Login from '@/components/Login'
import Podcast from '@/components/Podcast'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'podcasts',
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
