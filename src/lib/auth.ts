// Authentication utility functions
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'mdoner' | 'client';
  department: string;
}

export const auth = {
  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  // Get user from localStorage
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return !!auth.getToken() && !!auth.getUser();
  },

  // Logout user
  logout: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get authorization header for API calls
  getAuthHeader: (): Record<string, string> => {
    const token = auth.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};