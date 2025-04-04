const axios = require('axios');

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Cache to minimize API calls to the test server
const cache = {
  users: null,
  posts: null,
  lastFetched: {
    users: 0,
    posts: 0
  }
};

const CACHE_TTL = 30000; // 30 seconds

// Helper function to check if cache is valid
const isCacheValid = (type) => {
  return cache[type] && (Date.now() - cache.lastFetched[type] < CACHE_TTL);
};

// Get all users
const getUsers = async (req, res, next) => {
  try {
    if (!isCacheValid('users')) {
      const response = await axios.get(`${API_BASE_URL}/users`);
      cache.users = response.data;
      cache.lastFetched.users = Date.now();
    }
    res.json(cache.users);
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
};

// Get top 5 users with the highest post counts
const getTopUsers = async (req, res, next) => {
  try {
    if (!isCacheValid('users') || !isCacheValid('posts')) {
      const [usersResponse, postsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/users`),
        axios.get(`${API_BASE_URL}/posts`)
      ]);
      
      cache.users = usersResponse.data;
      cache.posts = postsResponse.data;
      cache.lastFetched.users = Date.now();
      cache.lastFetched.posts = Date.now();
    }
    
    // Count posts per user
    const userPostCounts = {};
    cache.posts.posts.forEach(post => {
      if (!userPostCounts[post.userid]) {
        userPostCounts[post.userid] = 0;
      }
      userPostCounts[post.userid]++;
    });
    
    // Create array of users with post counts
    const usersWithCounts = Object.entries(userPostCounts).map(([userId, count]) => {
      return {
        id: userId,
        name: cache.users.users[userId],
        postCount: count
      };
    });
    
    // Sort by post count (descending) and take top 5
    const topUsers = usersWithCounts
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);
    
    res.json({ topUsers });
  } catch (error) {
    console.error('Error fetching top users:', error);
    next(error);
  }
};

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    if (!isCacheValid('posts')) {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      cache.posts = response.data;
      cache.lastFetched.posts = Date.now();
    }
    res.json(cache.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    next(error);
  }
};

// Get posts by type (popular or latest)
const getPostsByType = async (req, res, next) => {
  try {
    const type = req.query.type || 'popular';
    
    if (!['popular', 'latest'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type parameter. Must be "popular" or "latest"' });
    }
    
    if (!isCacheValid('posts')) {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      cache.posts = response.data;
      cache.lastFetched.posts = Date.now();
    }
    
    // Ensure posts exist in the cache before proceeding
    if (!cache.posts || !cache.posts.posts || !Array.isArray(cache.posts.posts)) {
      return res.status(500).json({ 
        error: 'Invalid data structure received from API', 
        posts: [],
        type 
      });
    }
    
    // Get all posts
    let posts = [...cache.posts.posts];
    
    if (type === 'popular') {
      // For each post, fetch the comments count
      try {
        const postsWithCommentCounts = await Promise.all(
          posts.map(async (post) => {
            try {
              const commentResponse = await axios.get(`${API_BASE_URL}/posts/${post.id}/comments`);
              const commentCount = commentResponse.data.comments?.length || 0;
              return { ...post, commentCount };
            } catch (error) {
              console.error(`Error fetching comments for post ${post.id}:`, error);
              return { ...post, commentCount: 0 };
            }
          })
        );
        
        // Sort by comment count (descending)
        posts = postsWithCommentCounts
          .sort((a, b) => b.commentCount - a.commentCount);
        
        // If multiple posts have the same comment count, display all of them
        // No need to limit as per requirements
      } catch (error) {
        console.error('Error processing popular posts:', error);
        // If there's an error fetching comments, still return posts without comment counts
      }
    } else if (type === 'latest') {
      // Sort by most recent posts (assuming higher IDs are newer posts)
      posts = posts.sort((a, b) => b.id - a.id).slice(0, 5);
    }
    
    res.json({ posts, type });
  } catch (error) {
    console.error(`Error fetching ${req.query.type || 'popular'} posts:`, error);
    next(error);
  }
};

module.exports = {
  getUsers,
  getTopUsers,
  getPosts,
  getPostsByType
}; 