const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runTests() {
  try {
    console.log('Testing the Social Media Analytics API...');
    
    // Test the health endpoint
    console.log('\nTesting health endpoint...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('Health check:', healthResponse.data.status);
    
    // Test getting all users
    console.log('\nTesting users endpoint...');
    const usersResponse = await axios.get(`${API_URL}/users`);
    console.log('Users fetched successfully:', Object.keys(usersResponse.data.users).length > 0);
    
    // Test getting top users
    console.log('\nTesting top users endpoint...');
    const topUsersResponse = await axios.get(`${API_URL}/users/top`);
    console.log('Top users fetched successfully:', topUsersResponse.data.topUsers.length > 0);
    console.log('Number of top users:', topUsersResponse.data.topUsers.length);
    
    // Test getting popular posts
    console.log('\nTesting popular posts endpoint...');
    const popularPostsResponse = await axios.get(`${API_URL}/posts/popular`);
    console.log('Popular posts fetched successfully:', popularPostsResponse.data.posts.length > 0);
    
    // Test getting latest posts
    console.log('\nTesting latest posts endpoint...');
    const latestPostsResponse = await axios.get(`${API_URL}/posts/latest`);
    console.log('Latest posts fetched successfully:', latestPostsResponse.data.posts.length > 0);
    console.log('Number of latest posts:', latestPostsResponse.data.posts.length);
    
    // Test getting comments for a post
    const postId = latestPostsResponse.data.posts[0].id;
    console.log(`\nTesting comments endpoint for post ${postId}...`);
    const commentsResponse = await axios.get(`${API_URL}/posts/${postId}/comments`);
    console.log('Comments fetched successfully:', commentsResponse.data !== null);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Error during testing:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

runTests(); 