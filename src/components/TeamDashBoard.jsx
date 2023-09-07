import { useState } from "react";
import userTeams from "../hooks/useTeams";

const TeamDashBoard = ({ teamsId }) => {

    const { teams } = userTeams();
    const teamIdToFind = teamsId; // Replace with the team ID you want to find

    let team = null;

    if (teams) {
        team = teams.find((team) => team.teamId === teamIdToFind);
    }

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCreateTask = (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;
        const dueDate = event.target.dueDate.value;
        const priority = event.target.priority.value;

        const newTask = {
            title,
            description,
            dueDate,
            priority
        }
        const { teamName, teamId, tasks, usersMail } = team;
        tasks.push(newTask)

        const teams = JSON.parse(localStorage.getItem('teams'));
        const newTeams = teams.filter(newTeams => newTeams.teamId !== teamId);

        newTeams.push({
            teamName, teamId, tasks, usersMail
        })

        localStorage.setItem('teams', JSON.stringify(newTeams))

        console.log(newTeams);

        toggleModal();
    };

    //modal

    return (
        <div>
            <button
                onClick={toggleModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Create Task
            </button>
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

                                <form onSubmit={(e) => handleCreateTask(e)}>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                            Title
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Task Title"
                                            className="w-full p-3 border rounded"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            name="description"
                                            id="description"
                                            placeholder="Task Description"
                                            className="w-full p-3 border rounded"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
                                            Due Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            className="w-full p-3 border rounded"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
                                            Priority
                                        </label>
                                        <select
                                            required
                                            name="priority"
                                            id="priority"
                                            className="w-full p-3 border rounded"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                                        >
                                            Create Task
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamDashBoard;