import { JwtPayload, jwtDecode } from 'jwt-decode';




class AuthService {
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
    return !!this.getToken(); // Returns true if a token exists, indicating the user is logged in 
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token) return true; // Token is expired if it doesn't exist

    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // Check expiration
  }

  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem('token'); // Retrieve the token from localStorage
  }

  // TODO: set the token to localStorage
  login(idToken: string) { localStorage.setItem('token', idToken); // Save the token to localStorage

    // TODO: redirect to the home page
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token'); // Remove the token from localStorage

    // TODO: redirect to the login page
    window.location.assign('./pages/login'); // Redirect to the login page
  }
}

export default new AuthService();
