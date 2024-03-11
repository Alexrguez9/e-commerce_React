import React from "react";
import { useAuth } from "../context/AuthContext";
import './Profile.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Profile = () => {
    const { user, login, logout } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setError,
        formState: { errors },
        reset,
    } = useForm();
    
    const onSubmit = handleSubmit((data) => {
        console.log('User:', user);

        if (!user) {
            const updatedData = handleAdmin(data);
            console.log(updatedData);
            login(updatedData);
            reset();
            navigate(location.state.pathname);
        } else{
            logout();
            if (!data.name || !data.email) {
            alert('Por favor, rellena todos los campos');
            return;
        }
        }
    });

    const handlePasswordValidation = () => {
        if (errors.password) {
            clearErrors("password");
        }

        const password = watch("password");
        const repeatPassword = watch("repeatPassword");

        if (password.length < 8) {
            return setError("password", {
                message: "La contraseña debe tener al menos 8 caracteres",
            });
        }

        if (password === repeatPassword) {
            clearErrors();
        }
    }

    const handleAdmin = (data) => {
        const email = watch("email");
        const role = email.includes("@admin") ? "admin" : "user";
        return {...data, role}
    }

    const handleLogout = () => {
        if (user) {
            logout();
        }
    }

    const handleEmailValidation = () => {
        const email = watch("email");

        if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
            setError("email", {
                message: "Por favor, introduce un email válido",
            });
        }
    }

    return (
        <main>
            <div id="profile-card">
                <div className="content">
                    <h1>Profile</h1>
                    <form onSubmit={onSubmit}>
                        <div className="inputs">
                        <div className="input-container">
                            <label>
                                Name:
                                <input 
                                    type="text"
                                    {...register("name", { 
                                        required: "Por favor, introduce tu nombre",
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        },
                                        maxLength: 40,
                                    })}
                                />
                                {errors.name && <span>{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="input-container">
                            <label>
                                Email: 
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Por favor, introduce tu email",
                                    })}
                                    onBlur={() => handleEmailValidation()}
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="input-container">
                            <label>
                                Password: 
                                <input
                                    type="password"
                                    {...register("password", { 
                                        required: true,
                                        minLength: {
                                            value: 8,
                                            message: "La contraseña debe tener al menos 8 caracteres"
                                        }
                                    })}
                                    onBlur={() => handlePasswordValidation()}
                                />
                                {errors.password && <span>{errors.password.message}</span>}
                            </label>
                        </div>
                        <div className="input-container">
                            <label>
                                Repeat password: 
                                <input
                                    type="password"
                                    {...register("repeatPassword", {
                                        required: "Por favor, repite la contraseña",
                                        validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
                                    })}
                                    onBlur={() => handlePasswordValidation()}
                                    
                                />
                                {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
                            </label>
                        </div>
                    </div>
                    {!user ? <div><button>Login</button></div> : <div><button onClick={handleLogout}>Cerrar sesión</button></div>}
                    {user && (
                    <div>
                        <p>¿Quieres cerrar sesión {user.name}?</p>
                    </div>
                    )}
                </form>
                </div>
            </div>

        </main>
    );
}

export default Profile;
