'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password })
      });
      
      const data = await res.json();
      console.log(data)
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.name));
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="username"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          <p className="text-center mt-4">
  Don't have an account?{' '}
  <a href="/signup" className="text-blue-500 hover:underline">
    Sign Up
  </a>
</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
