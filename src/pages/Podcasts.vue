<template>

    <div>
      <div class="pa4-l">
      <form  @submit.prevent="submit" class="bg-light-red mw7 center pa4 br2-ns ba b--black-10" >
        <fieldset class="cf bn ma0 pa0">
          <div class="cf">
            <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" 
            placeholder="What are you looking for today ?"  type="text" v-model="search">
          </div>
        </fieldset>
      </form>
    </div>

    <PodcastListItem v-for="p in podcasts" :key="p.id" :p="p" ></PodcastListItem>

    <div class="m8 tc v-mid top-40" v-show="podcasts.length == 0 ">
      <h2>Nothing found !</h2>
    </div>

    <div class="mw8 center"  v-show="totalPages > 1">
      <nav class="cf pa3 pa4-ns" data-name="pagination-next-prev">
        <a class="fl dib link dim black f6 f5-ns b pa2" :disabled="!hasPrev" @click="prev" title="Previous">&larr; Previous</a>
        <a class="fr dib link dim black f6 f5-ns b pa2" :disabled="!hasNext" @click="next" title="Next">Next &rarr;</a>
      </nav>
    </div>

    </div>
</template>
<script>

import PodcastListItem from '@/components/PodcastListItem'

export default {
  name:'Podcasts',
  props:['p','q'],
  components: {PodcastListItem},
  data:function(){
    return {
      currentPage:1,
      totalPages:0,
      search:'',
      podcasts:[]
  }},
  computed:{
    hasNext:function(){return this.currentPage < this.totalPages-1},
    hasPrev:function(){ return this.currentPage > 1},
  },
  methods:{
   submit: function(){
     this.currentPage=1;
     this.doSearch();
   },
    next:function(){
      if (!this.hasNext) return;
      this.currentPage++;
      this.doSearch();
    },
    prev:function(){
      if (!this.hasPrev) return;
      this.currentPage--;      
      this.doSearch();
    },
    doSearch:function(){
       var prms = {p:this.currentPage};
      if (this.search){
        prms["q"]= this.search;
      }
      this.$router.push({path:"/", query:prms});
     
    },
    getUrlParameter: function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    load:function(){
        let url = `/api/showslist?page=${this.currentPage}`;
        if (this.search) url +="&q="+ this.search;
        this.axios.get(url)
        .then((resp) => {
            this.totalPages = resp.data.totalPages;
            this.podcasts=resp.data.content;
          })
        .catch((err)=> console.log(err))
    }
  },
  watch:{
    $route:{
      imediate:true,
      handler(to, from){
      this.search = to.query.q;
      if (to.params.p) this.currentPage = to.params.p;
      //console.log(" watch page: " + to.query.p);
      
      this.load();
    }
    }
  },
   beforeRouteUpdate : function(to, from, next) {
    //console.log(" guard page: " + to.query.p);
  
  next();
   },
  created:function(){
    if (this.getUrlParameter('p')) this.currentPage =  this.getUrlParameter('p');
    if (this.getUrlParameter('q')) this.search =  this.getUrlParameter('q');
    this.load();
  }
}
</script>


<style>
.border-box {
    box-sizing: border-box;
}

.ba {
    border-style: solid;
    border-width: 1px;
}

.flex {
    display: flex;
}

.inline-flex {
    display: inline-flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.w1 {
    width: 1rem;
}

.black {
    color: #000;
}

.hover-white:hover {
    color: #fff;
}

.hover-white:focus {
    color: #fff;
}

.hover-bg-black:hover {
    background-color: #000;
}

.hover-bg-black:focus {
    background-color: #000;
}

.pa3 {
    padding: 1rem;
}

.pa4 {
    padding: 2rem;
}

.pl1 {
    padding-left: .25rem;
}

.pr1 {
    padding-right: .25rem;
}

.mr4 {
    margin-right: 2rem;
}

.no-underline {
    text-decoration: none;
}

.f5 {
    font-size: 1rem;
}

.bg-animate, .bg-animate:hover, .bg-animate:focus {
    transition: background-color .15s ease-in-out;
}

.top-40{
  margin-top: 40px;
}

.bottom-20{
  margin-bottom:20px;
}

</style>

