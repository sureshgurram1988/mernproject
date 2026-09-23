import React, {useState, useEffect} from 'react'

const UserDetails = () => {
    const[users, setUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/users/allemployees")
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])
  return (
    <div>
      {
        users && (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Eamil</th>
                            <th>password</th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users.map((item) => (
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                 <td>{item.email}</td>
                                  <td>{item.password}</td>
                                  <td></td>
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
