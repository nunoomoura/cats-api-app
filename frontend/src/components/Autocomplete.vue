<template>
    <div>
        <input type="text" v-model="searchTerm" @input="searchTags" />
        <ul v-show="showResults">
            <li v-for="tag in tags" :key="tag" @click="selectTag(tag)">{{ tag }}</li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchTerm: '',
            tags: [],
            showResults: false,
        };
    },
    methods: {
        async searchTags() {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_PORT}/api/v1/cats/tags`);
                const tags = await response.json();

                if (this.searchTerm === '') {
                    this.tags = [];
                    this.showResults = false;
                    return 0;
                }

                this.tags = tags.filter((tag) =>
                    tag.toLowerCase().startsWith(this.searchTerm.toLowerCase())
                );

                this.showResults = true;
            } catch (error) {
                console.error(error);
            }
        },
        selectTag(tag) {
            this.searchTerm = tag;
            this.showResults = false;
            this.$emit('tag-click', tag);
        },
    },
};
</script>
  