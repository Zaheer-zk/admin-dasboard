class AuthService {
  static async login(email, password) {
    if (email === 'zaheer.khan@fexle.com' && password === '12345678') {
      return true;
    } else {
      throw new Error('Invalid email or password');
    }
  }

  static async register(email, password) {
    if (email && password) {
      return true;
    } else {
      throw new Error('Registration failed');
    }
  }
}

export default AuthService;
