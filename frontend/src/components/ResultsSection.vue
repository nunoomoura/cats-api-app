<script>
export default {
  props: {
    catImages: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    alternateSearches: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateResults(images) {
      console.log(images); // add this line
      this.$emit('results-update', images);
    }
  }
};
</script>

<template>
  <div>
    <ul>
      <li v-for="(catImage, index) in catImages" :key="catImage.id">
        <img :src="catImage.url" :alt="catImage.id">
      </li>
    </ul>
    <div>
      <button @click="onPrevPageClick" :disabled="currentPage === 1">Prev Page</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="onNextPageClick" :disabled="currentPage === totalPages">Next Page</button>
    </div>
    <ul>
      <li v-for="(tag, index) in alternateSearches" :key="index" @click="onTagClick(tag)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>