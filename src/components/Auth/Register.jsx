import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './../../services/AuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleRegistrationSubmit}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
