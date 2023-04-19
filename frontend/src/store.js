import { createStore } from 'vuex'

const store = createStore({
  state: {
    searchResults: [],
    searchQuery: ''
  },
  mutations: {
    updateSearchResults (state, results) {
        state.searchResults = results
    },
    updateSearchQuery(state, payload) {
        state.searchQuery = payload
    }
  },
  actions: {
    async fetchSearchResults ({ commit }, query) {
      // make API call to fetch search results
      const results = await api.fetchSearchResults(query)

      // commit mutation to update the search results state
      commit('updateSearchResults', results)
    }
  }
})

export default store
