import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users/top');
        setUsers(response.data.topUsers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top users');
        setLoading(false);
        console.error('Error fetching top users:', err);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div className="card">Loading top users...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div className="card">
      <h2>Top 5 Users with Most Posts</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <span>{user.name}</span>
              <span>{user.postCount} posts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopUsers; 