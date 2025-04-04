const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getUsers, getTopUsers, getPosts, getPostsByType } = require('./controllers');

// Top Users API
router.get('/users', getUsers);
router.get('/users/top', getTopUsers);

// Posts API
router.get('/posts', getPosts);
router.get('/posts/type', getPostsByType);

// Popular Posts - direct route
router.get('/posts/popular', (req, res, next) => {
  try {
    req.query.type = 'popular';
    getPostsByType(req, res, next);
  } catch (error) {
    console.error('Error in popular posts route:', error);
    next(error);
  }
});

// Latest Posts - direct route
router.get('/posts/latest', (req, res, next) => {
  try {
    req.query.type = 'latest';
    getPostsByType(req, res, next);
  } catch (error) {
    console.error('Error in latest posts route:', error);
    next(error);
  }
});

// Comments API
router.get('/posts/:postId/comments', async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(`Fetching comments for post ${postId}`);
    
    const response = await axios.get(`http://20.244.56.144/evaluation-service/posts/${postId}/comments`);
    
    // Ensure we have a valid response
    if (!response.data) {
      return res.status(404).json({ error: 'No comments found', comments: [] });
    }
    
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching comments for post ${req.params.postId}:`, error);
    // Return empty comments array instead of an error
    res.json({ comments: [] });
  }
});

module.exports = router; 