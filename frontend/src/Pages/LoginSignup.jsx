import React, { useState } from 'react';
import './Css/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // Default to "Login"
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [loading, setLoading] = useState(false); // Added loading state

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password, email } = formData;
    if (state === "Sign Up" && !username) {
      alert('Username is required for sign up');
      return false;
    }
    if (!email || !password) {
      alert('Email and password are required');
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;

    setLoading(true); // Set loading state
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const signup = async () => {
    if (!validateForm()) return;

    setLoading(true); // Set loading state
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && 
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Enter Your Name'
            />
          }
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" id="agree" />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }} disabled={loading}>
          {loading ? 'Processing...' : state}
        </button>
        {state === "Sign Up" ? 
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState('Login')}>Login here</span>
          </p>
        : 
          <p className="loginsignup-login">
            Create an account? <span onClick={() => setState('Sign Up')}>Click here</span>
          </p>
        }
      </div>
    </div>
  );
};

export default LoginSignup;
