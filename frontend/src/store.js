import { createStore } from 'vuex'

const store = createStore({
  state: {
    searchResults: [],
    alternateSearches: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
  },
  mutations: {
    updateSearchResults(state, payload) {
        state.searchResults = payload.images;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
        state.alternateSearches = payload.alternateSearches
    },
    updateSearchQuery(state, payload) {
      state.searchQuery = payload;
    }
  },
  actions: {
    async fetchSearchResults ({ commit }, query) {
      const results = await api.fetchSearchResults(query);
      const totalPages = Math.ceil(results.length / 10);
      commit('updateSearchResults', { results, totalPages });
    }
  }
})

export default store
