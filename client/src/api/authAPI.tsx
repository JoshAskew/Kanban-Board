import { UserLogin } from "../interfaces/UserLogin";
import Auth from '../utils/auth'; // Make sure you have Auth utility for token handling


const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo), // Convert userInfo to JSON string
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed, please check your credentials.');
      }
  
      // If login is successful, store the token
      Auth.login(data.token); // Assuming your API returns a token
  
      return data; // Return user data or any relevant information you need
    } catch (err) {
      console.error('Login error:', err);
    }
  }




export { login };
