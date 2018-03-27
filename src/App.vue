<template>
  <div id="app">
    <h2>The Vue.js podcasts agregator</h2>
    <div>
      <router-link to="/">home</router-link>
      <router-link v-show="isAuthenticated" to="/admin/producers">producers</router-link>
      <router-link v-show="isAuthenticated" to="/admin/test">tester</router-link>
      <router-link v-show="!isAuthenticated" to="/login">login</router-link>
      <a v-show="isAuthenticated" v-on:click="update">update</a>
      <a v-show="isAuthenticated" v-on:click="logout">logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';
export default {
  name: 'App',
  data:function(){
    return {
      isAuthenticated: false
    }
  },
  methods:{
    logedin: function(){
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", this.isAuthenticated);
      this.$router.push({name:'producers'})
    },
    logout:function(){
      console.log('logging out ....');
      this.isAuthenticated = false;
      this.$router.push({name:'podcasts'})
    },
    update: function(){
      HTTP.get('/producers/update')
      .then((resp)=> console.log("done: " + resp.data))
      .catch((err) => console.log(err));
      this.$router.push({name:'podcasts'})
    }
  },
  created:function(){
    this.isAuthenticated =localStorage.getItem("isAuthenticated");
      this.$eventHub.$on('logged-in', this.logedin);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a{
  text-decoration: none
}
</style>
