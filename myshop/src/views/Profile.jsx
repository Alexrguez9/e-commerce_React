import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import './Profile.css';
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, login, logout } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', role:'' , password:'', repeatPassword:''});

    const navigate = useNavigate();
    const location = useLocation();

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        if (value.includes("@admin")){
            formData.role = "admin";
        } else {
            formData.role = "user";
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            ['role']: formData.role,
        }));
    }

    const handleLogin = () => {
        if (!formData.name || !formData.email) {
            alert('Por favor, rellena todos los campos');
            return;
        }
        if (formData.password == formData.repeatPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        login(formData);
        setFormData({ name: '', email: '' });
        navigate(location.state.pathname);
    }

    return (
        <main>
            <div id="profile-card">
                <div className="content">
                    <h1>Profile</h1>
                    <div className="inputs">
                        <div className="input-container">
                            <h2>Nombre: </h2>
                            <input 
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputsChange}
                            />
                        </div>
                        <div className="input-container">
                            <h2>Email: </h2>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputsChange}
                            />
                        </div>
                        <div className="input-container">
                            <h2>Password: </h2>
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputsChange}
                            />
                        </div>
                        <div className="input-container">
                            <h2>Repeat password: </h2>
                            <input
                                type="text"
                                name="repeatPassword"
                                placeholder="Repeat password"
                                value={formData.repeatPassword}
                                onChange={handleInputsChange}
                            />
                        </div>
                    </div>
                {!user ? <div><button onClick={handleLogin}>Login</button></div> : <div><button onClick={logout}>Cerrar sesión</button></div>}
                {user && (
                  <div>
                    <p>¿Quieres cerrar sesión {user.name}?</p>
                  </div>
                )}
                </div>
            </div>
        </main>
    );
}

export default Profile;
