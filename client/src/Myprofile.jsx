import React,{useState, useEffect, useContext} from 'react'
import { store } from './App'
import { Navigate } from 'react-router-dom'
import UserDetails from './UserDetails'

const Myprofile = () => {
  const[data, setData]= useState(null)
  const[token, setToken] = useContext(store)
  const[loading, setLoading] = useState(true)
  const[dropdownOpen, setDropdownOpen] = useState(false)
  const[users, setUsers] = useState([])
  useEffect(() => {
    
      if(token){
        fetch("http://localhost:4000/users/myprofile", {
          method:"GET",
          headers:{"Authorization": `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => setData(data))
        .finally(() => setLoading(false))
      }
    
  }, [token])
 
  if(!token){
    return <Navigate to="/login" />
  }
  if(loading){
    return (
      <main className="myprofile-page profile-loading" aria-live="polite">
        <div className="spinner-border text-primary" role="status" aria-label="Loading profile"></div>
        <p>Loading your profile...</p>
      </main>
    )
  }
  const cards = [
    { icon: '👤', title: 'Profile', description: 'Manage your personal info and account details.' },
    { icon: '📧', title: 'Messages', description: 'Check account updates and important notifications.' },
    { icon: '📊', title: 'Analytics', description: 'View your activity and performance summary at a glance.' },
    { icon: '🔒', title: 'Security', description: 'Stay protected with secure access and account safety.' },
  ]
  return (
    <div className="myprofile-page">
      {
        data && (
          <div className="dropdown profile-menu d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label="Open admin menu"
            >
              <i className="bi bi-person-circle"></i> Admin
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu show profile-menu-list">
                <li><span className="dropdown-item-text"> <i className="bi bi-person-circle"></i> {data.username}</span></li>
                <li>
                  <button className="dropdown-item" onClick={() => {
                    setData(null)
                    setToken(null)
                  }}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )
      }
      <h2>Welcome {data?.username || 'User'}</h2>

      <div className="profile-card-grid">
        {cards.map((card) => (
          <div className="profile-card" key={card.title}>
            <div className="profile-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button className="profile-readmore">Read more</button>
          </div>
        ))}
      </div>
      <UserDetails />
    </div>
  )
}

export default Myprofile
