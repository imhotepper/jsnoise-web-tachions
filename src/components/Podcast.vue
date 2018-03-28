<template>
    <div class="row marketing">
        <div class="col-lg-12">
            <h4>{{podcast.title}}</h4>
            <audio controls>  <source  :src="podcast.mp3"> </audio>
            <div>by {{podcast.producerName}} on : {{podcast.pubDate | date}}</div>
            <h4></h4>
            <p hidden v-html="podcast.description"></p>
        </div>       
    </div>
</template>

<script>
export default {
  props:['id'],
  data: function(){return {podcast:null}},
  methods:{
      load:function(){
          if (this.id){
              this.axios.get(`/api/shows/${this.id}`)
              .then((resp) => this.podcast = resp.data)
              .catch((err) => console.log(err));
          }
      }
  },
  created:function(){this.load();}
}
</script>

