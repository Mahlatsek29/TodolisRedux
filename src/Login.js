import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const isValidated = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                params: {
                    username,
                    password
                }
            });

            const users = response.data;
            const loggedInUser = users[0]; // Assuming username is unique, retrieve the first user

            if (loggedInUser) {
                return true; // Successful login
            } else {
                console.log('Invalid credentials');
                return false; // Invalid credentials
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return false; // Error occurred
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const regobi = { password, username };
        if (isValidated()) {
            axios.post("http://localhost:8000/user/", regobi)
                .then((res) => {
                    toast.success("Logged in successfully.");
                    navigate("/todo");
                })
                .catch((err) => {
                    toast.error("Failed: " + err.message);
                });
        }
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                <form onSubmit={handleLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>
                                    User Name <span className="errmsg">*</span>
                                </label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Password <span className="errmsg">*</span>
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                            <Link to="/register" className="btn btn-success">
                                New User
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
