import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const[error, setError] = useState({username:"", email:"", password:"", confirmpassword:""})
  const[success, setSuccess] = useState("")
  const[loading, setLoading] = useState(false)
    const[data, setData] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    const changeHandler = e => {
        setData({...data, [e.target.name]:e.target.value})
      setError({...error, [e.target.name]:""})
    }
    const submitHandler = async (e) => {
        e.preventDefault()
      const errorMessages = {}
      if(!data.username){
        errorMessages.username = "Username is required"
      }
      if(!data.email){
        errorMessages.email = "Email is required"
      }
      if(!data.password){
        errorMessages.password = "Password is required"
      }
      if(!data.confirmpassword){
        errorMessages.confirmpassword = "Please confirm your password"
      } else if(data.password !== data.confirmpassword){
        errorMessages.confirmpassword = "Passwords do not match"
      }
      if(Object.keys(errorMessages).length > 0){
        setError(errorMessages)
        return
      }
      setLoading(true)
        try{
            const res = await fetch(`http://localhost:4000/users/add-emp`, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
        const result = await res.json()
        if(res.ok){
          setSuccess(result.Message || "Registration successful")
          setTimeout(() => navigate("/login"), 1500)
        } else {
          setError({
            username: result.field === "username" ? result.message : "",
            email: result.field === "email" ? result.message : "",
            password: result.field === "password" ? result.message : "",
            confirmpassword: result.field === "confirmpassword" ? result.message : ""
          })
        }
        }
        catch(err){
          console.error("Unable to connect to the server", err)
        }
        finally{
          setLoading(false)
        }
        
    }
  return (
    <main className="auth-page">
      <form onSubmit={submitHandler} className="auth-card">
        <h1 className="auth-title">Register</h1>
        {success && <div className="alert alert-success" role="status">{success}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input id="username" type="text" className={`form-control ${error.username ? "is-invalid" : ""}`} name="username" value={data.username} onChange={changeHandler}/>
          {error.username && <div className="invalid-feedback" role="alert">{error.username}</div>}
        </div>
        <div className="mb-3">
          <label  className="form-label">Email</label>
          <input id="register-email" type="text" className={`form-control ${error.email ? "is-invalid" : ""}`} name="email" value={data.email} onChange={changeHandler}/>
          {error.email && <div className="invalid-feedback" role="alert">{error.email}</div>}
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input id="register-password" type="password" className={`form-control ${error.password ? "is-invalid" : ""}`} name="password" value={data.password} onChange={changeHandler}/>
          {error.password && <div className="invalid-feedback" role="alert">{error.password}</div>}
        </div>
        <div className="mb-3">
          <label  className="form-label">Confirm password</label>
          <input id="confirm-password" type="password" className={`form-control ${error.confirmpassword ? "is-invalid" : ""}`} name="confirmpassword" value={data.confirmpassword} onChange={changeHandler}/>
          {error.confirmpassword && <div className="invalid-feedback" role="alert">{error.confirmpassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              Registering...
            </>
          ) : "Register"}
        </button>
      </form>
    </main>
  )
}

export default Register
