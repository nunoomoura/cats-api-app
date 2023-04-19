const asyncHandler = require('express-async-handler')
const axios = require('axios')

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

    // and respond with information matching the filter tag
    const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}&skip=0&limit=10000`);
    const totalResults = response.data.length;
    console.log(response)

    const filteredResponse = await axios.get(`https://cataas.com/api/cats?tags=${tag}&skip=${omit}&limit=${total}`);
    const filteredResults = filteredResponse.data;

    res.json({ totalResults, filteredResults });
  })

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
    matchTag
}