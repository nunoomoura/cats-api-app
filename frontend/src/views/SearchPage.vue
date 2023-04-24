<template>
    <div>
        <search-section @update-query="onUpdateQuery"></search-section>
        <results-section :cat-images="searchResults" :current-page="currentPage" :total-pages="totalPages"
            :alternate-searches="alternateSearches" :tag="searchQuery"
            @page-change="(searchQuery, page) => fetchImages(searchQuery, page)"
            @search="(searchQuery) => fetchImages(searchQuery, 1)"></results-section>
    </div>
</template>

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
            const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/filter?tag=${tag}&omit=${(page - 1) * 10}&total=10000`);
            const json = await response.json();
            const images = json.filteredResults
            const totalResults = json.totalResults;
            const totalPages = Math.ceil(totalResults / 10);
            const imageUrls = images.slice(0, 10).map((image) => ({
                url: `https://cataas.com/cat/${image._id}`,
                id: image._id
            }));
            const results = {
                images: imageUrls,
                totalPages: totalPages,
                currentPage: page,
            };
            this.updateSearchResults(results);
        }
    },
};
</script>
