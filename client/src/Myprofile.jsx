import React,{useState, useEffect, useContext} from 'react'
import { store } from './App'
import { Navigate } from 'react-router-dom'
import UserDetails from './UserDetails'

const Myprofile = () => {
  const[data, setData]= useState(null)
  const[token, setToken] = useContext(store)
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
      }
    
  }, [token])
 
  if(!token){
    return <Navigate to="/login" />
  }
  return (
    <div>
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
      <UserDetails />
    </div>
  )
}

export default Myprofile
