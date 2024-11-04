import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  timeoutCallback: () => void;

  constructor(timeoutCallback: () => void) {
    this.timeoutCallback = timeoutCallback; // Set the callback for session timeout
    this.autoLogout();
  }
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decode the JWT to get the payload
    }
    return null; // Return null if there is no token
  }
  
  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    
     if (!token) return true; // Token is expired if it doesn't exist

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // Check expiration
  } catch (error) {
    console.error('Token decoding failed:', error);
    return true; // Treat invalid tokens as expired
  }
  }

  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem('id_token') || ''; // Retrieve the token from localStorage
  }

  // TODO: set the token to localStorage
  login(idToken: string) { 
    localStorage.setItem('id_token', idToken); // Save the token to localStorage

    // TODO: redirect to the home page
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token'); // Remove the token from localStorage

    // TODO: redirect to the login page
    window.location.assign('/'); // Redirect to the login page
  }
  autoLogout() {
    const token = this.getToken();
    if (!token) return;
  
    setInterval(() => {
      if (this.isTokenExpired(token)) {
        this.timeoutCallback();
        this.logout();
      }
    }, 15000);
  }
}

export default new AuthService(() => {
  alert("Session has timed out. Please log in again."); // Display a session timeout message
});
