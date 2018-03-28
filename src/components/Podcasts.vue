<template>
<div>
  <div v-for="p in podcasts" :key="p.id">
    <h4>
      <router-link :to="`/podcasts/${p.id}`">
      {{p.title}}
      </router-link>
      </h4>
    <p>
      <span>by {{p.producerName}}</span>
      <span>on {{p.pubDate | date }}</span>
    </p>
  </div>
  <div>
    <button class="btn " :disabled="!hasPrev" @click="prev">Prev</button>
    <button class="btn" :disabled="!hasNext" @click="next">Next</button>
  </div>
</div>
  
</template>
<script>

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
        this.axios.get(`/api/showslist?page=${this.currentPage}`)
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

