<template>
  <div>
    <label for="search-input">Search for cat images:</label>
    <autocomplete
      id="search-input"
      v-model="query"
      :options="tags"
      @input="onSearchInput"
      @tag-click="onTagClick"
    >
    </autocomplete>
    <button @click="onSearchButtonClick">Search</button>
  </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete.vue';

export default {
  components: {
    Autocomplete,
  },
  data() {
    return {
      query: '',
      tags: [],
      searchButtonClicked: false,
    };
  },
  methods: {
    async onSearchInput(input) {
      if (this.searchButtonClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/match?substr=${input}`
        );
        const tags = await response.json();
        this.tags = tags;
      }
    },
    onTagClick(tag) {
      console.log(tag);
      this.query = tag;
    },
    onSearchButtonClick() {
      this.searchButtonClicked = true;
      this.$emit('update-query', this.query);
    },
  },
};
</script>
