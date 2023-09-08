
import useAuth from "./useAuth"

const userTeams = () => {
    const { user } = useAuth();
    console.log(user?.email);
    const allUsers = JSON.parse(localStorage.getItem('users'));

    let currentUser;
    if (user) {
        currentUser = allUsers.find(n => n.email === user?.email);
    }
console.log(currentUser);
    let teams = localStorage.getItem('teams');

    if (teams) {
        teams = JSON.parse(teams);
        if (currentUser?.teams) {
            // Assuming currentUser.teams is an array of teamId
            const currentUserTeams = currentUser.teams;
            console.log(currentUserTeams);
            teams = teams.filter(team => currentUserTeams.includes(team.teamId));
            console.log(teams);
        } else {
            // If currentUser doesn't have teams, return an empty array
            teams = [];
        }
    } else {
        // If no teams data found in localStorage, return an empty array
        teams = [];
    }

    return { teams }; // Always return an object with a 'teams' property
}

export default userTeams;
