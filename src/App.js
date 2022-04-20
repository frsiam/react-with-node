import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  // load data from server site to client site ...as usually fetch method data load by get method
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(name, email)

    // post data to server from client site 

    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const newUsers = [...users, data]
        setUsers(newUsers);
      })

  }

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser} className='w-50 mx-auto my-5 border p-3 border-primary'>
        <div className="mb-3">
          <input name='name' type="text" className="form-control fs-5 bg-info" id="exampleInputPassword1" placeholder='Name' required />
        </div>
        <div className="mb-3">
          <input name='email' type="email" className="form-control bg-warning fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' required />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id} ---- Name:{user.name} / Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
