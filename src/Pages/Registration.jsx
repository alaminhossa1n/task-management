import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Registration = () => {

    const { addUser} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.pass.value;
        const username = event.target.username.value;
        const profilePicture = event.target.profilePicture.value;
        const bio = event.target.bio.value;

        addUser(email, password, username, profilePicture, bio);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl text-center mb-6">Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-3 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="url"
                            name="profilePicture"
                            placeholder="Profile Picture URL"
                            className="w-full p-3 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            className="w-full p-3 border rounded"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center">
                    Have an account? <Link to="/login">Please Login</Link>
                </p>
            </div>
        </div>

    );
};

export default Registration;