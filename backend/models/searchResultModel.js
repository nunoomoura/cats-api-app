// Define the SearchResult model
const SearchResult = sequelize.define('search_result', {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

SearchResult.belongsTo(SearchQuery);

module.exports = SearchResult;