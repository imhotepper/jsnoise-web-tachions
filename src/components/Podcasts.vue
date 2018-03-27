<template>
<div>
  <div>podcasts</div>
  <div v-for="p in podcasts" :key="p.id"> {{p.title}}</div>
  <div>
    <button  :disabled="!hasPrev" @click="prev">Prev</button>
    <button :disabled="!hasNext" @click="next">Next</button>
  </div>
</div>
  
</template>
<script>
import {HTTP} from '@/http-common'

export default {
  name:'Podcasts',
  data:function(){
    return {
      currentPage:1,
      totalPages:0,
    podcasts:[]
  }},
  computed:{
    hasNext:function(){
      return this.currentPage < this.totalPages-1},
     hasPrev:function(){ return this.currentPage > 1},
  },
  methods:{
   
    next:function(){
    //  if (this.hasNext) return;
      this.currentPage++;
      this.load();
    },
    prev:function(){
      //if (this.hasPrev) return;
      this.currentPage--;
      this.load();
    },
    load:function(){
        HTTP.get(`/showslist?page=${this.currentPage}`)
    .then((resp) => {
        this.totalPages = resp.data.totalPages;
        this.podcasts=resp.data.content;
      })
    .catch((err)=> console.log(err))
    }
  },
  created:function(){
    this.load();
  }
}
</script>

