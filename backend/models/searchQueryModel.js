// Define the SearchQuery model
const SearchQuery = sequelize.define('search_query', {
    query: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

SearchQuery.hasMany(SearchResult);

module.exports = SearchQuery;