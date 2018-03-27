<template>
<div>
  <div>Producers</div>
  <form @submit.prevent="add">
    <input type="text" v-model="producer.name" required placeholder="producer name">
    <input type="url"  v-model="producer.website"  required placeholder="producer url">
    <input type="url"  v-model="producer.feedUrl"  required placeholder="feeds url">
    <button>add</button>
  </form>
  <br/>
  <div>
    <div v-for="p in producers" :key="p.feedUrl"> {{p.name}} </div>
  </div>
  </div>
</template>
<script>
import {HTTP} from '@/http-common'

export default {
  data: function(){
    return {
      producer:{ name:'',website:'',feedUrl:''},
      producers:[]
    }
  },
  methods:{
    add: function(){
        HTTP.post('/producers',this.producer)
        .then((resp)=>{
            this.producer ={ name:'',website:'',feedUrl:''};
            this.load();
        })
        .catch((err)=> console.log(err));
        
    },
    getEmptyPriducer: function(){
      return { name:'',url:'',feedUrl:''};
    },
    saveProducers: function(){
      localStorage.setItem("producers", JSON.stringify( this.producers));
    },
    load:function(){
      HTTP.get('/producers')
      .then((resp) => this.producers = resp.data)
      .catch((err)=> console.log(err));
    }
  },
  created:function(){
    this.load();
    
  }
}
</script>

