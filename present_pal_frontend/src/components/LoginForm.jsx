import React, { useState } from 'react';
import '../styles.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <h1>Welcome back!</h1>
      <p className="login-subtitle">Login below</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@reallygreatestate.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          LOG IN
        </button>

        <p className="signup-prompt">
          New to Present Pal? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;