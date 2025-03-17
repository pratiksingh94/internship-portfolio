import { useState, useEffect } from 'react'
import MemberCard from './components/MemberCard'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import './App.css'

function App() {
  // const [text, setText] = useState("")
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/members')
        if (!response.ok) {
          throw new Error('Failed to fetch  ')
        }
        const data = await response.json()
        setMembers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

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
        {/* todo: show stack trace */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* <Navbar />
      <Hero />
      <About />
      <Services /> */}
      <section className="py-20 bg-[#0a0a0a]" id="team">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Our Team</h2>
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
      {/* <Footer /> */}
    </div>
  )
}

export default App
