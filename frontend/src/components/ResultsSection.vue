<template>
  <div>
    <ul>
      <li v-for="(catImage, index) in catImages" :key="catImage.id">
        <img :src="catImage.url" :alt="catImage.id">
      </li>
    </ul>
    <div v-if="totalPages > 0">
      <button @click="onPrevPageClick" :disabled="currentPage === 1">Prev Page</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="onNextPageClick" :disabled="currentPage === totalPages">Next Page</button>
    </div>
    <ul>
      <li v-for="tag in alternateSearches" :key="tag" @click="suggestClick(tag)">{{ tag }}</li>
    </ul>
  </div>
</template>

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
    },
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayedImages() {
      const start = (this.currentPage - 1) * 10;
      const end = start + 10;
      return this.catImages.slice(start, end);
    }
  },
  methods: {
    onPrevPageClick() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.tag, this.currentPage - 1);
      }
    },
    onNextPageClick() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.tag, this.currentPage + 1);
      }
    },
    suggestClick(tag) {
      this.$emit('suggested-query', tag);
    },
  }
};
</script>