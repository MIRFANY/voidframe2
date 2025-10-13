'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  department: string;
}

interface LoginFormProps {
  onLogin?: (userData: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (onLogin) {
          onLogin(data.user);
        }

        // Redirect to portal
        router.push('/portal');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to authentication service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (email: string, password: string) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <>
      {/* Demo Credentials for Judges */}
      <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Demo Accounts for Judges:</h3>
        <div className="space-y-2 text-xs">
          <div className="cursor-pointer hover:bg-blue-800/20 p-2 rounded transition-colors"
               onClick={() => fillCredentials('mdoner.admin@gov.in', 'MDoNER@2025')}>
            <span className="text-gray-300">MDoNER Admin (Click to fill):</span>
            <div className="text-blue-200">📧 HackRebel.nitsri.ac.in</div>
            <div className="text-blue-200">🔑 HackRebel@2025</div>
          </div>
          <div className="border-t border-blue-500/20 pt-2 cursor-pointer hover:bg-blue-800/20 p-2 rounded transition-colors"
               onClick={() => fillCredentials('client.user@project.in', 'Client@2025')}>
            <span className="text-gray-300">Client User (Click to fill):</span>
            <div className="text-blue-200">📧 HackRebel-client.nitsri.ac.in</div>
            <div className="text-blue-200">🔑 HackRebel@2025</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-300">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Don&apos;t have access? Contact your administrator or the{' '}
          <span className="text-blue-400">Ministry of Development of North Eastern Region</span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;