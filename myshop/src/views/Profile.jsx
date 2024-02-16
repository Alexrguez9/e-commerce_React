import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import './Profile.css';

const Profile = () => {
    const { user, login, logout, isAuthenticated} = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleLogin = () => {
        if (!formData.name || !formData.email) {
            alert('Por favor, rellena todos los campos');
            return;
        }

        login(formData);
        setFormData({ name: '', email: '' });
    }

    return (
        <main>
            <div className="content">
                <h1>Profile</h1>
                <div className="inputs">
                    <h2>Nombre: </h2>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputsChange}
                    />
                    <h2>Email: </h2>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputsChange}
                    />
                </div>
                {!user ? <div><button onClick={handleLogin}>Login</button></div> : <div><button onClick={logout}>Cerrar sesión</button></div>}
                {user && (
                  <div>
                    <p>¿Quieres cerrar sesión {user.name}?</p>
                  </div>
                )}
            </div>
        </main>
    );
}

export default Profile;
