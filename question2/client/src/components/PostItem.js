import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostItem({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    // Fetch user data for this post if we have a valid userId
    const fetchUserData = async () => {
      if (loadingUser || !post.userid) return;
      
      try {
        setLoadingUser(true);
        const response = await axios.get(`/api/users`);
        if (response.data && response.data.users && response.data.users[post.userid]) {
          setUserData(response.data.users[post.userid]);
        }
        setLoadingUser(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [post.userid, loadingUser]);

  const fetchComments = async () => {
    if (comments.length > 0 || loading || !post.id) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/${post.id}/comments`);
      
      // Handle possible response formats
      if (response.data && Array.isArray(response.data.comments)) {
        setComments(response.data.comments);
      } else if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        console.warn('Unexpected comments response format:', response.data);
        setComments([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setLoading(false);
      setComments([]);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  // Safely handle post content - ensure it exists
  const postContent = post.content || 'No content available';

  return (
    <div className="post-item">
      <div className="post-header">
        <span className="post-author">
          {userData ? userData : `User: ${post.userid || 'Unknown'}`}
        </span>
        {post.commentCount !== undefined && (
          <span>{post.commentCount} comments</span>
        )}
      </div>
      <div className="post-content">{postContent}</div>
      <div className="post-actions">
        <button onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
      
      {showComments && (
        <div className="comments-section">
          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            <ul className="comments-list">
              {comments.map((comment) => (
                <li key={comment.id || Math.random()} className="comment-item">
                  {comment.content || 'No comment content'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostItem; 