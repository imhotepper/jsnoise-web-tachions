

import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        podcast: null,
        podcasts: [],
        totalPages: null,
        first: false,
        last: false,
        q: ''
    },
    getters: {
        podcasts: (state) => state.podcasts,
        first: (state) => state.first,
        last: (state) => state.last,
        totalPages: (state) => state.totalPages,
        q: (state) => state.q,
        podcast: (state) => state.podcast

    },
    mutations: {
        setPodcasts(state, details) {
            state.podcasts = details.podcasts;
            state.first = details.first;
            state.last = details.last;
            state.totalPages = details.totalPages;
        },
        setPodcast: (state, podcast) => state.podcast = podcast
    },
    actions: {
        loadPodcast(context, id) {
            Vue.axios
                .get(`/api/shows/${id}`)
                .then(resp =>
                    context.commit('setPodcast', resp.data))
                .catch(err => console.log(err));

        },
        loadPodcasts(context, details) {
            var url = `/api/showslist?page=${details.page}`;
            if (details.pid) {
                url = `/api/producers/${details.pid}/shows?page=${details.page}`;
            }

            if (details.q) url += "&q=" + details.q;

            Vue.axios
                .get(url)
                .then(resp => {
                    context.commit("setPodcasts", {
                        podcasts: resp.data.content,
                        last: resp.data.last,
                        first: resp.data.first,
                        totalPages: resp.data.totalPages
                    });
                })
                .catch(err => console.log(err));
        }
    }
})
