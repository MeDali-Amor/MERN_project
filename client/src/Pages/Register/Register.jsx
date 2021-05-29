import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/actions/user";
const Register = ({ history }) => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(user, history));
    };

    return (
        <div>
            <h1>Register Page</h1>
            <div>
                <h1>Login Page</h1>
                <div className="login-container">
                    <h3 className="login-title">Welcome</h3>
                    <form action onSubmit={handleRegister}>
                        <div className="input">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-button"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
