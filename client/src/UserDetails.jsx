import React, {useState, useEffect} from 'react'

const UserDetails = () => {
    const[users, setUsers] = useState([])
  const[editingId, setEditingId] = useState(null)
  const[editData, setEditData] = useState({username:"", email:"", password:"", confirmpassword:""})
  const[error, setError] = useState("")

    useEffect(() => {
        fetch("http://localhost:4000/users/allemployees")
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

  useEffect(() => {
    if(!error){
      return
    }

    const timer = setTimeout(() => setError(""), 3000)
    return () => clearTimeout(timer)
  }, [error])

  const startEdit = (user) => {
    setEditingId(user._id)
    setEditData({
      username: user.username,
      email: user.email,
      password: user.password,
      confirmpassword: user.confirmpassword
    })
    setError("")
  }

  const changeHandler = (e) => {
    setEditData({...editData, [e.target.name]: e.target.value})
  }

  const saveEdit = async (id) => {
    setError("")
    if(!editData.username || !editData.email || !editData.password || !editData.confirmpassword){
      setError("All fields are required")
      return
    }
    if(editData.password !== editData.confirmpassword){
      setError("Passwords do not match")
      return
    }

    const res = await fetch(`http://localhost:4000/users/allemployees/${id}`, {
      method:"PUT",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(editData)
    })
    const result = await res.json()
    if(!res.ok){
      setError(result.message || result.Message || "Unable to update user")
      return
    }
    setUsers(users.map(user => user._id === id ? result : user))
    setEditingId(null)
  }

  const deleteUser = async (id) => {
    if(!window.confirm("Delete this user?")){
      return
    }
    const res = await fetch(`http://localhost:4000/users/allemployees/${id}`, {
      method:"DELETE"
    })
    if(!res.ok){
      const result = await res.json()
      setError(result.message || result.Message || "Unable to delete user")
      return
    }
    setUsers(users.filter(user => user._id !== id))
  }
  return (
    <div>
      {
        users && (
          <div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <table className="table table-striped users-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Confirm password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users.map((item) => (
                            <tr key={item._id}>
                            {editingId === item._id ? (
                              <>
                                <td><input className="form-control" name="username" value={editData.username} onChange={changeHandler}/></td>
                                <td><input className="form-control" name="email" value={editData.email} onChange={changeHandler}/></td>
                                <td><input className="form-control" type="password" name="password" value={editData.password} onChange={changeHandler}/></td>
                                <td><input className="form-control" type="password" name="confirmpassword" value={editData.confirmpassword} onChange={changeHandler}/></td>
                                <td className="text-nowrap">
                                  <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(item._id)}>Save</button>
                                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.confirmpassword}</td>
                                <td className="text-nowrap">
                                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEdit(item)}>Edit</button>
                                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(item._id)}>Delete</button>
                                </td>
                              </>
                            )}
                            </tr>
                        ))
                        
                        }
                    </tbody>
                </table>
                </div>
        )
      }
    </div>
  )
}

export default UserDetails
