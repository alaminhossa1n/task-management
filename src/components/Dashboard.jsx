import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import userTeams from "../hooks/useTeams";
import TeamDashBoard from "./TeamDashBoard";

const Dashboard = () => {
    const { user, logoutUser } = useAuth();
    const { teams } = userTeams();
    console.log(teams);

    const [selectedOption, setSelectedOption] = useState('contact');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCreateTeam = (event) => {
        event.preventDefault();
        const teamName = event.target.teamName.value;
        const teamId = Math.round(Math.random() * 10000000000);

        console.log(teamName, teamId);

        let teams = localStorage.getItem('teams');

        if (teams) {
            teams = JSON.parse(teams);
        } else {
            teams = [];
        }
        teams.push({
            teamName,
            teamId,
            usersMail: [user.email],
            tasks: [],
        })

        localStorage.setItem('teams', JSON.stringify(teams));

        toggleModal();
    };



    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side - Drawer */}
            <div className="bg-gray-800 w-full md:w-1/4">
                <div className="py-4">
                    <h1 className="text-white text-xl font-bold px-4 mb-4">Task Management</h1>

                    <div>
                        <Profile></Profile>
                    </div>
                    <hr className="my-5" />

                    <div>
                        <button
                            onClick={toggleModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Create Team
                        </button>
                    </div>

                    <div className="text-white">
                        <h1>Your Teams</h1>
                        <ul>
                            {teams ? (
                                teams.map((team, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer px-4 py-2 text-white ${selectedOption === team.teamId ? 'bg-blue-500' : ''
                                            }`}
                                        onClick={() => handleOptionChange(team.teamId)}
                                    >
                                        <h1>{team.teamName}</h1>
                                    </li>
                                ))
                            ) : (
                                <li>No teams available</li>
                            )}
                        </ul>


                    </div>

                    <ul>
                        <li
                            className={`cursor-pointer px-4 py-2 text-white ${selectedOption === 'contact' ? 'bg-blue-500' : ''
                                }`}
                            onClick={() => handleOptionChange('contact')}
                        >
                            Contact
                        </li>
                        <li
                            className={`cursor-pointer px-4 py-2 text-white ${selectedOption === 'mapAndChart' ? 'bg-blue-500' : ''
                                }`}
                            onClick={() => handleOptionChange('mapAndChart')}
                        >
                            Map and Chart
                        </li>
                    </ul>
                </div>
                {
                    user ? <div>
                        <button
                            onClick={() => logoutUser()}
                            className="text-white bg-red-600 px-7 py-2 rounded-md">
                            Logout
                        </button>
                    </div> : <div className="flex justify-between px-5">
                        <Link to='login'><button className="text-white bg-green-600 px-7 py-2 rounded-md">Login</button></Link>
                        <Link to='/registration'><button className="text-white bg-blue-600 px-7 py-2 rounded-md">Register</button></Link>
                    </div>
                }
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-3/4 p-8 bg-amber-100">
                {/* modal  */}
                <div>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                    <div className="modal-close cursor-pointer z-50">
                                        <span onClick={toggleModal} className="modal-close-button">
                                            X
                                        </span>
                                    </div>

                                    <form onSubmit={(e) => handleCreateTeam(e)}>
                                        <div className="mb-4">
                                            <input
                                                required
                                                type="text"
                                                name="teamName"
                                                placeholder="Team Name"
                                                className="w-full p-3 border rounded"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                                            >
                                                Create Team
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {selectedOption === selectedOption && <TeamDashBoard teamsId={selectedOption}></TeamDashBoard>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;