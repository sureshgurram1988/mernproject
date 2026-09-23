import React, {useState, useContext} from 'react'
import { store } from './App'
import { Navigate } from 'react-router-dom'
import { API_URL } from './api'


const Login = () => {
  const[token, setToken]=useContext(store)
    const[error, setError] = useState({email:"", password:""})
    const[loading, setLoading] = useState(false)
    const[data, setData] = useState({
        
        email:"",
        password:"",
        
    })
    const changeHandler = e => {
        setData({...data, [e.target.name]:e.target.value})
      setError({...error, [e.target.name]:""})
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const errorMessages = {}

        if(!data.email){
            errorMessages.email = "Email is required"
        }
        if(!data.password){
            errorMessages.password = "Password is required"
        }
        if(Object.keys(errorMessages).length > 0){
            setError(errorMessages)
            return
        }
        setLoading(true)
        try{
        const res = await fetch(`${API_URL}/users/login`, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
        const result = await res.json()
      if(!res.ok){
        setError({
          email: result.field === "email" ? result.message : "",
          password: result.field === "password" ? result.message : ""
        })
        return
      }
        setToken(result.token)
        }
        catch(err){
        console.error("Unable to connect to the server", err)
        }
        finally{
          setLoading(false)
        }
        
    }
    if(token){
      return <Navigate to="/myprofile" replace/>
    }
  return (
    <main className="auth-page">
      <form onSubmit={submitHandler} className="auth-card">
        <h1 className="auth-title">Login</h1>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">Email</label>
         <input id="login-email" className={`form-control ${error.email ? 'is-invalid' : ''}`} type="text" name="email" onChange={changeHandler}/> 
        {error.email && <p className="error mt-8"  role="alert">{error.email}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">Password</label>
          <input id="login-password" className={`form-control ${error.password ? 'is-invalid' : ''}`} type="password" name="password" onChange={changeHandler}/> 
        {error.password && <p className="error mt-8" role="alert">{error.password}</p>}
          </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              Logging in...
            </>
          ) : "Submit"}
        </button>
      </form>
    </main>
  )
}

export default Login
