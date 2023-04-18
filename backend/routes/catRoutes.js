const express = require('express')
const router = express.Router()

const { 
    getTags,
    filterCats,
    matchTag,
} = require('../controllers/catController')

// GET /api/v1/tags
router.get('/tags', getTags);
  
// GET /api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}
router.get('/filter', filterCats);
  
// GET api/v1/cats/match?string={{substr}}
router.get('/match', matchTag);

module.exports = router