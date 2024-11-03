import { UserLogin } from "../interfaces/UserLogin";
import Auth from '../utils/auth'; 


const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
    try {
      const response = await fetch('/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo), // Convert userInfo to JSON string
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error data
        throw new Error(errorData.message || 'Login failed, please check your credentials.');
      }
      
      const data = await response.json();
  
      // If login is successful, store the token
      Auth.login(data.token); // Assuming API returns a token
  
      return data; // Return user data or any relevant information you need
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  }


export { login };
