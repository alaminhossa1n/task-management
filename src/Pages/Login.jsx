import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { loginUser } = useAuth();

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value
        const password = event.target.pass.value

        loginUser(email, password)
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl text-center mb-6">Login</h1>
                <form onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="pass"
                            placeholder="Password"
                            className="w-full p-3 border rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Add the registration link */}
                <p className="text-center">
                    Dont have an account? <Link to="/registration">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;