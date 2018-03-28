// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as uiv from 'uiv'


Vue.use(VueAxios, axios);
Vue.use(uiv);
Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.filter("date", function(val){
  if (!val) return "";
  var dt = new Date(val);//.toString("yyyy-MM-dd");
  return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDay()}`;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
