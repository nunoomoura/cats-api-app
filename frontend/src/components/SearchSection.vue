<script>
import Autocomplete from "../components/Autocomplete.vue";

export default {
  components: {
    Autocomplete,
  },
  data() {
    return {
      query: '',
      tags: []
    };
  },
  methods: {
    async onSearchInput(input) {
      if (input.data !== null) {
        const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/match?substr=${this.query}`);
        const tags = await response.json();
        this.tags = tags;
      }
    },
    async onTagClick(tag) {
      this.query = tag.target.value;
      this.$emit('update-query', this.query);
    },
    updateResults(images) {
      this.$emit('results-update', images);
    }
  }
};
</script>

<template>
  <div>
    <label for="search-input">Search for cat images:</label>
    <autocomplete id="search-input" v-model="query" :options="tags" @input="onSearchInput" @select="onTagClick">
    </autocomplete>
  </div>
</template>