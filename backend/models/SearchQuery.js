const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SearchResult = require('./SearchResult');

class SearchQuery extends Model {
  static associate(models) {
    this.hasMany(models.SearchResult, { foreignKey: 'queryId' });
  }
}

SearchQuery.init(
  {
    query: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'SearchQuery'
  }
);

module.exports = SearchQuery;
