class Auth {
  static authenticateToken(token) {
    sessionStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    const isAuth = sessionStorage.getItem('token');
    if(isAuth === null || isAuth === 'undefined') {
      return false
    }
    return true
  }

  static deauthenticateToken() {
    sessionStorage.removeItem('token');
  }

  static getToken() {
    return sessionStorage.getItem('token');
  }
}

export default Auth;
