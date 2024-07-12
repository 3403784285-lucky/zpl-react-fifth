import React, { useState } from 'react';
import Request from '../api';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState(''); // State to hold room name
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
     
            const response = await Request('/api/login', {   
                method: "POST",
                data:{
                    username,password,room
                },
              });
            console.log(response.data);
            if (response) {
                onLoginSuccess(response.data, room); // Call onLoginSuccess with user data and room
            } else {
                setError('Invalid username or password.');
            }
       
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Room:</label>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
