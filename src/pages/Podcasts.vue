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
        <a class="fl dib link dim black f6 f5-ns b pa2" :disabled="first" @click="prev" title="Previous">&larr; Previous</a>
        <a class="fr dib link dim black f6 f5-ns b pa2" :disabled="last" @click="next" title="Next">Next &rarr;</a>
      </nav>
    </div>

    </div>
</template>
<script>
import PodcastListItem from "@/components/PodcastListItem";

export default {
  name: "Podcasts",
  components: { PodcastListItem },
  data: function() {
    return {
      currentPage: 1,
      totalPages: 0,
      search: "",
      podcasts: [],
      first: false,
      last: false
    };
  },

  methods: {
    submit: function() {
      this.currentPage = 1;
      this.doSearch();
    },
    next: function() {
      if (this.last) return;
      this.currentPage++;
      this.doSearch();
    },
    prev: function() {
      if (this.first) return;
      this.currentPage--;
      this.doSearch();
    },
    doSearch: function() {
      var prms = { p: this.currentPage };
      if (this.search) {
        prms["q"] = this.search;
      }
      this.$router.push({ path: "/", query: prms });
    },
    load: function() {
      let url = `/api/showslist?page=${this.currentPage}`;
      if (this.search) url += "&q=" + this.search;
      this.axios
        .get(url)
        .then(resp => {
          this.totalPages = resp.data.totalPages;
          this.podcasts = resp.data.content;
          this.first = resp.data.first;
          this.last = resp.data.last;
        })
        .catch(err => console.log(err));
    }
  },
  // watch: {
  //   $route: {
  //     imediate: true,
  //     handler(to, from) {
  //       this.search = to.query.q || "";
  //       this.currentPage = to.query.p || 1;
  //       this.load();
  //     }
  //   }
  // },
  beforeRouteUpdate: function(to, from, next){
        this.search = to.query.q || "";
        this.currentPage = to.query.p || 1;
        this.load();
        next();
  },
  created: function() {
    this.search = this.$route.query.q || "";
    this.currentPage = this.$route.query.p || 1;
    this.load();
  }
};
</script>



