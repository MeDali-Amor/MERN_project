import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions/user";

const Login = ({ history }) => {
    const [user, setUser] = useState({});
    // const [error , setError] = useState()
    const error = useSelector((state) => state.userReducer.errors);
    // console.log(errors);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user, history));
    };
    return (
        <div>
            <div>
                <h1>Login Page</h1>
                <div className="login-container">
                    <h3 className="login-title">Welcome</h3>
                    <form action onSubmit={handleLogin}>
                        <div className="input">
                            <label htmlFor>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-button"
                            onSubmit={handleLogin}
                        >
                            Login
                        </button>
                        {error &&
                            (error !== null ||
                                error !== "" ||
                                error !== {}) && (
                                <div>
                                    <p className="error">
                                        {/* {error.errors[0].msg} */}
                                    </p>
                                </div>
                            )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
