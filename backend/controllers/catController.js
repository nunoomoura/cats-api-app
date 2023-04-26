const asyncHandler = require('express-async-handler')
const axios = require('axios');
const SearchQuery = require('../models/SearchQuery');
const SearchResult = require('../models/SearchResult');

const getTags = asyncHandler(async (req, res) => {
    // Add code to fetch tags from the target API and respond with them
    axios.get('https://cataas.com/api/tags')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
      res.status(500)
      throw new Error(error);
    });
})

const filterCats = asyncHandler(async (req, res) => {
  const { tag, omit, total } = req.query;

  // Add code to validate the tag, omit, and total parameters
  if (!tag || !omit || !total) {
      res.status(400)
      throw new Error('Please add all fields!')
  }

  try {
    
    // Fetch cats matching the filter tag
    const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}&skip=0&limit=10000`);
    
    const results = response.data;
    const totalResults = results.length;
    
    // Create a new SearchQuery entry
    const [query, created] = await SearchQuery.findOrCreate({
      where: { query: tag },
      defaults: { count: totalResults }
    });
    
    if (!created) {
      query.count += totalResults;
      await query.save();
    }
    
    const filteredResponse = await axios.get(`https://cataas.com/api/cats?tags=${tag}&skip=${omit}&limit=${total}`);
    const filteredResults = filteredResponse.data;

    // Create SearchResult entries for each result
    const searchResults = results.map((result) => ({
      query: query.id,
      results: results,
    }));
    await SearchResult.bulkCreate(searchResults);

    res.json({ totalResults, filteredResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const stats = asyncHandler(
  async (req, res) => {
    try {
      const topSearchQueries = await SearchQuery.findAll({
        order: [['count', 'DESC']],
        limit: 10,
      });
  
      const topFoundCategories = await SearchResult.findAll({
        attributes: [
          'query',
          [Sequelize.fn('COUNT', Sequelize.col('query')), 'count'],
        ],
        group: ['query'],
        order: [[Sequelize.literal('count DESC')]],
        limit: 10,
      });
  
      res.render('stats', { topSearchQueries, topFoundCategories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
)


const matchTag = asyncHandler(async (req, res) => {
    const { string } = req.query;
  
    // Add code to find tag names that have the substring in their name
    axios.get(`https://cataas.com/api/tags`)
      .then(response => {
        const filteredTags = response.data.filter(tag => tag.includes(string));
        const structuredResponse = filteredTags.map(tag => ({ tagName: tag }));
  
        res.json(structuredResponse);
      })
      .catch(error => {
        res.status(500);
        throw new Error(error);
      });
  });

module.exports = {
    filterCats,
    getTags,
    matchTag,
    stats
}