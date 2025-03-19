import { useState, useEffect } from 'react'
import MemberCard from './components/MemberCard'
import LoginModal from './components/LoginModal'
import DashboardModal from './components/DashboardModal'
import './App.css'

function App() {
  // const [text, setText] = useState("")
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/members')
      if (!response.ok) {
        throw new Error('Failed to fetch  ')
      }
      const data = await response.json()
      // Filter out admin members
      setMembers(data.filter(member => !member.isAdmin))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('invalid username or password')

      const { member, token } = await response.json();
      // console.log(member, token)
      setUser(member);
      localStorage.setItem('token', token);
    } catch {
      throw new Error('invalid username or password');
    }
  };
  

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
        
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-2xl text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="text-white">
                Welcome, {user.name}
              </div>
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Dashboard
              </button>
            </>
          )}
        </div>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Login
            </button>
          )}
        </div>
      </header>

  
      <section className="py-20 bg-[#0a0a0a]" id="team">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Our Team
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Meet our exceptional team of innovators and problem solvers who make the magic happen.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={user}
        onUpdate={fetchMembers}
      />
    </div>
  )
}

export default App
