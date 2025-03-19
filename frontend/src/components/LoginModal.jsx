import { useState } from 'react';
import { MagicCard } from './MagicCard';

const LoginDialog = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(username, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <MagicCard
          className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(158,122,255,0.3)]"
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
          gradientSize={150}
          gradientOpacity={0.5}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
            {error && (
              <div className="text-red-500 mb-4 text-base">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-base" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 text-base" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  required
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-gray-300 hover:text-white text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-base"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </MagicCard>
      </div>
    </div>
  );
};

export default LoginDialog; 