import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import '../styles/UserPage.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    country: ''
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    try {
      await axiosPrivate.post('/user/addUser', formData);
      setFormSuccess('User created successfully!');
      setFormData({
        username: '',
        password: '',
        email: '',
        country: ''
      });
      // Refresh the users list
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      setFormError(err.response?.data?.message || 'Failed to create user');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <h1>Users</h1>
        <button 
          className="add-user-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <div className="add-user-form">
          <h2>Add New User</h2>
          {formError && <div className="form-error">{formError}</div>}
          {formSuccess && <div className="form-success">{formSuccess}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Create User</button>
          </form>
        </div>
      )}

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