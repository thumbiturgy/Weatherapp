import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({});
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5709890a40d45bafdeeab6bfa134f258`
  const urlUser = `postgres://ojzdvhlv:MOqCzE62pcLT_PkdkMWQOPrj6Hz1vDqu@rajje.db.elephantsql.com/ojzdvhlv`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }
  }

  const userLogin = () => {
    const userData = {
      username: user.username,
      password: user.password,
    };

    axios.post('urlUser/login', loginData)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const userLogout = () => {
    axios.post('urlUser/logout')
    .then((response) => {
      setUser(null);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type='text'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
            <h1>{data.main.temp}</h1>
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>65°</p>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <p>20%</p>
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className='bold'>12 MPH</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={userLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={userLogin}>Login</button>
          <button>Register</button>
        </div>
      )}
    </div>
  );
}

export default App;
