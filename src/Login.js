import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(null); // null initially, "player" or "admin" when a role is selected

    const handleLogin = (role) => {
        if (!username || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        console.log(`Logging in as ${role} with:`, username, password);
        setErrorMessage('');
    };

    const handleShowForm = (role) => {
        setShowForm(role); // Show form based on role selected
    };

    return (
        <>
            <h1 className="login-heading">Welcome to the Sports Management System!</h1>
            <div className="login-container">
                <div className="login-box">
                    {/* Role Selection Buttons */}
                    {!showForm && (
                        <div className="role-buttons">
                            <button onClick={() => handleShowForm('player')} className="btn btn-secondary">Player</button>
                            <button onClick={() => handleShowForm('admin')} className="btn btn-secondary">Administrator</button>
                        </div>
                    )}

                    {/* Player Login Form */}
                    {showForm === 'player' && (
                        <div className={`login-form-container ${showForm === 'player' ? 'show' : ''}`}>
                            <h2 className="login-title">Player Login</h2>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <form onSubmit={(e) => e.preventDefault()} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button onClick={() => handleLogin('Player')} className="btn btn-primary">Login as Player</button>
                            </form>

                            {/* Register Link only visible for Player login */}
                            <div className="register-link">
                                <p>Don't have an account? <a href="/register" className="register-text">Register here</a></p>
                            </div>
                        </div>
                    )}

                    {/* Administrator Login Form */}
                    {showForm === 'admin' && (
                        <div className={`login-form-container ${showForm === 'admin' ? 'show' : ''}`}>
                            <h2 className="login-title">Administrator Login</h2>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <form onSubmit={(e) => e.preventDefault()} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button onClick={() => handleLogin('Administrator')} className="btn btn-primary">Login as Administrator</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
