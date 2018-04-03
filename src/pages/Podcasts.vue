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

<article class="pv4 bt bb b--black-10 ph3 ph0-l"  v-for="p in podcasts" :key="p.id"  >
    <div class="flex flex-column flex-row-ns">
      <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
        <h1 class="f3 athelas mt0 lh-title">
          <router-link  class="no-underline" :to="`/podcasts/${p.id}`">{{p.title}}</router-link></h1>
        <p class="f5 f4-l lh-copy athelas">
        </p>
      </div>
      <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
       
      </div>
    </div>
    <p class="f6 lh-copy gray mv0">By <span class="ttu"> {{p.producerName}}</span></p>
    <time class="f6 db gray">{{p.pubDate | date }}</time>
  </article>

<div class="m8 tc v-mid top-40" v-show="podcasts.length == 0 ">
  <h2>Nothing found !</h2>
</div>

<div class="mw8 center"  v-show="totalPages > 1">
  <nav class="cf pa3 pa4-ns" data-name="pagination-next-prev">
    <a class="fl dib link dim black f6 f5-ns b pa2" :disabled="!hasPrev" @click="prev" title="Previous">&larr; Previous</a>
    <a class="fr dib link dim black f6 f5-ns b pa2" :disabled="!hasNext" @click="next" title="Next">Next &rarr;</a>
  </nav>
</div>
<div class="flex items-center justify-center pa4" v-show="totalPages > 1" hidden>
  <a  :disabled="!hasPrev" @click="prev" class="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
      <svg class="w1" data-icon="chevronLeft" viewBox="0 0 32 32" style="fill:currentcolor">
        <title>chevronLeft icon</title>
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
      </svg>
    <span class="pl1">Previous</span>
  </a>
  <a   :disabled="!hasNext" @click="next" class="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box">
    <span class="pr1">Next</span>
    <svg class="w1" data-icon="chevronRight" viewBox="0 0 32 32" style="fill:currentcolor">
      <title>chevronRight icon</title>
      <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z"></path>
    </svg>
  </a>
</div>
</div>
</template>
<script>

export default {
  name:'Podcasts',
  props:['p','q'],
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
    load:function(){
        let url = `/api/showslist?page=${this.currentPage}`;
        if (this.search) url +="&q="+ this.search;
        this.axios.get(url)
        .then((resp) => {
            this.totalPages = resp.data.totalPages;
            this.podcasts=resp.data.content;
            window.scrollTo(0,0);
          })
        .catch((err)=> console.log(err))
    }
  },
  watch:{
    '$route'(to, from){
      this.search = to.query.q;
      this.load();
    }
  },
  created:function(){
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

