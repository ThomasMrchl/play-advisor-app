import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import '../styles/UserPage.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get('/user/getUsers');
        console.log('Response:', response.data);
        const usersData = response.data.result || response.data;
        setUsers(Array.isArray(usersData) ? usersData : [usersData]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-page">
      <h1>Users</h1>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.user_id} className="user-card">
            <div className="user-info">
              <h2>{user.username || 'Anonymous'}</h2>
              <div className="user-details">
                <p className="user-email">{user.email || 'No email provided'}</p>
                <p className="user-role">{user.role || 'User'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage; 