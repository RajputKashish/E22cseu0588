import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

function Posts({ type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoint = type === 'popular' ? '/api/posts/popular' : '/api/posts/latest';
        console.log(`Fetching posts from: ${endpoint}`);
        
        const response = await axios.get(endpoint);
        console.log('Response data:', response.data);
        
        // Handle both array and object response formats
        if (response.data && response.data.posts) {
          setPosts(response.data.posts);
        } else if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError(`Invalid response format from ${type} posts endpoint`);
          setPosts([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${type} posts:`, err);
        setError(`Failed to fetch ${type} posts: ${err.message}`);
        setLoading(false);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [type]);

  if (loading) return <div className="card">Loading posts...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div className="card">
      <h2>{type === 'popular' ? 'Popular Posts' : 'Latest Posts'}</h2>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts; 