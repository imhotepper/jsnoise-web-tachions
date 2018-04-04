<template>
<div>
  <h3>Producers list</h3>
  <form @submit.prevent="add" class="pv4 bt bb b--black-10 ph3 ph0-l" >
    <input type="text" v-model="producer.name"     required placeholder="producer name">
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

export default {
  data: function(){
    return {
      producer:{ name:'',website:'',feedUrl:''},
      producers:[]
    }
  },
  methods:{
    add: function(){
        this.axios.post('/api/producers',this.producer)
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
      this.axios.get('/api/producers')
      .then((resp) => this.producers = resp.data)
      .catch((err)=> console.log(err));
    }
  },
  created:function(){
    this.load();  
  }
}
</script>

