<template>


<article class="pv4 bt bb b--black-10 ph3 ph0-l" >
    <div class="flex flex-column flex-row-ns">
      <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
        <h1 class="f3 athelas mt0 lh-title">
            {{podcast.title}}      
        </h1>   
        <p class="f5 f4-l lh-copy athelas"> &nbsp;
        </p>
      </div>
      <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">           
            <p> <audio controls>  <source  :src="podcast.mp3"> </audio>  </p>     
      </div>
    </div>
    <p class="f6 lh-copy gray mv0">By <span class="ttu"> {{podcast.producerName}}</span></p>
    <time class="f6 db gray">{{podcast.pubDate | date }}</time>
  </article>
</template>

<script>
export default {
  props:['id'],
  data: function(){return {podcast:{}}},
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

