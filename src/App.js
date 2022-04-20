import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])
  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form>
        <input type="text" name="name" id="" placeholder='Name' />
        <input type="email" name="email" id="" placeholder='Email' />
        <input type="submit" value="Add User" />
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
