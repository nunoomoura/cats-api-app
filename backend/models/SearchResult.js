const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SearchQuery = require('./SearchQuery');

class SearchResult extends Model {
  static associate(models) {
    this.belongsTo(models.SearchQuery, { foreignKey: 'queryId' });
  }
}

SearchResult.init(
  {
    query: {
      type: DataTypes.STRING,
      allowNull: false
    },
    results: {
      type: DataTypes.JSON,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'SearchResult'
  }
);

module.exports = SearchResult;
