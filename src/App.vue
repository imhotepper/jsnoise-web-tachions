<template>
<!-- Begin page content -->
  
  <section class="mw7 center" id="app">
    <h2 class="athelas ph3 ph0-l ">
      <router-link to="/">JsNoise </router-link>
      </h2>
    <router-view/>
    
  </section>

</template>

<script>
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
/* #app {
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
.mymenu{ float: right; } */

h2{
    margin-top: 10px;
    margin-bottom: 20px;
}
 a{
    text-decoration: none !important;
}

.bt {
    border-top-style: solid;
    border-top-width: 1px;
}

.bb {
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.b--black-10 {
    border-color: rgba(0, 0, 0, .1);
}

.db {
    display: block;
}

.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.order-1 {
    order: 1;
}

.order-2 {
    order: 2;
}

.athelas {
    font-family: athelas, georgia, serif;
}

.lh-title {
    line-height: 1.25;
}

.lh-copy {
    line-height: 1.5;
}

.mw7 {
    max-width: 48rem;
}

.w-100 {
    width: 100%;
}

.gray {
    color: #777;
}

.pv4 {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.ph3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.mb4 {
    margin-bottom: 2rem;
}

.mt0 {
    margin-top: 0;
}

.mv0 {
    margin-top: 0;
    margin-bottom: 0;
}

.ttu {
    text-transform: uppercase;
}

.f3 {
    font-size: 1.5rem;
}

.f5 {
    font-size: 1rem;
}

.f6 {
    font-size: .875rem;
}

.center {
    margin-right: auto;
    margin-left: auto;
}

@media screen and (min-width: 30em) {
    .flex-row-ns {
        flex-direction: row;
    }

    .order-1-ns {
        order: 1;
    }

    .order-2-ns {
        order: 2;
    }

    .w-40-ns {
        width: 40%;
    }

    .w-60-ns {
        width: 60%;
    }

    .pl3-ns {
        padding-left: 1rem;
    }

    .pr3-ns {
        padding-right: 1rem;
    }

    .mb0-ns {
        margin-bottom: 0;
    }
}

@media screen and (min-width: 60em) {
    .ph0-l {
        padding-left: 0;
        padding-right: 0;
    }

    .f4-l {
        font-size: 1.25rem;
    }
}
</style>
