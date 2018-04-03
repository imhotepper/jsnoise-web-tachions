<template>
<!-- Begin page content -->
  
  <div class="container" id="app" >
      <div class="header clearfix">
        <nav>
          <ul hidden class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">About</a></li>
            <li role="presentation"><a href="#">Contact</a></li>
          </ul>
        </nav>
        <h3 class="text-muted"> </h3>
      </div>

      <div class="jumbotron">
        <h1><router-link to="/" >JsNoise</router-link></h1>
        <p class="lead"> Podcasts aggregator for all javascript podcasts</p>
      </div>

    <router-view></router-view>

    </div> <!-- /container -->



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
      this.axios.get('/producers/update')
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

a :hover {
  text-decoration: none
}
.mymenu{ float: right; }
</style>
