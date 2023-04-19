<script>
import SearchSection from '../components/SearchSection.vue';
import ResultsSection from '../components/ResultsSection.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    components: {
        SearchSection,
        ResultsSection
    },
    computed: {
        ...mapState(['searchQuery', 'searchResults', 'currentPage', 'totalPages', 'alternateSearches'])
    },
    methods: {
        ...mapMutations(['updateSearchQuery', 'updateSearchResults']),
        async onUpdateQuery(query) {
            this.updateSearchQuery(query);
            await this.fetchImages(query, 1);
        },
        async fetchImages(tag, page) {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/filter?tag=${tag}&omit=0&total=10`);
            const images = await response.json();
            const imageUrls = images.map((image) => `https://cataas.com/cat/${image._id}`);
            this.updateSearchResults(imageUrls);
        },
        onPageChange(tag, page) {
            this.updateSearchResults([]);
            this.fetchImages(tag, page);
        },
        async fetchImages(tag, page) {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/filter?tag=${tag}&omit=${(page - 1) * 10}&total=10`);
            const images = await response.json();
            const imageUrls = images.map((image) => ({
                url: `https://cataas.com/cat/${image._id}`,
                id: image._id
            }));
            this.updateSearchResults(imageUrls);
        }
    },
};
</script>

<template>
    <div>
        <search-section @update-query="onUpdateQuery"></search-section>
        <results-section 
            :cat-images="searchResults"
            :current-page="currentPage"
            :total-pages="totalPages"
            :alternate-searches="alternateSearches"
            @page-change="onPageChange"
            @results-update="updateSearchResults"></results-section>
    </div>
</template>
