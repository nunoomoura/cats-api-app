<template>
    <div>
        <search-section @update-query="onUpdateQuery"></search-section>
        <results-section :cat-images="searchResults" :current-page="currentPage" :total-pages="totalPages"
            :alternate-searches="alternateSearches" :tag="searchQuery"
            @page-change="(searchQuery, page) => fetchImages(searchQuery, page)"
            @search="(searchQuery) => fetchImages(searchQuery, 1)"
            @suggested-query="onUpdateQuery"></results-section>
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
            this.showResults = false;
            this.updateSearchQuery(query);
            await this.fetchImages(query, 1);
        },
        async fetchImages(tag, page) {
            if(!tag) return 0

            const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/filter?tag=${tag}&omit=${(page - 1) * 10}&total=10000`);
            const json = await response.json();
            const images = json.filteredResults

            if (!images) return 0

            const tags = new Set();
            images.forEach(item => {
                item.tags.forEach(itemTag => {
                    if(itemTag !== tag) tags.add(itemTag)
                });
            });
            const alternateSearches = Array.from(tags);
            const totalResults = json.totalResults;
            const totalPages = Math.ceil(totalResults / 10);
            const imageUrls = images.slice(0, 10).map((image) => ({
                url: `https://cataas.com/cat/${image._id}`,
                id: image._id
            }));
            const results = {
                images: imageUrls,
                currentPage: page,
                totalPages,
                alternateSearches
            };
            this.updateSearchResults(results);
        }
    },
};
</script>
