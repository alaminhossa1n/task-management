import useAuth from "./useAuth"

const userTeams = () => {
    const { user } = useAuth();
    console.log(user?.email);
    const allUsers = JSON.parse(localStorage.getItem('users'));

    let currentUser;
    if (user) {
        currentUser = allUsers.find(n => n.email === user?.email);
    }

    let teams = localStorage.getItem('teams');

    if (teams) {
        teams = JSON.parse(teams);
        if (currentUser?.teams) {
            // Assuming currentUser.teams is an array of teamId
            const currentUserTeams = currentUser.teams;
            teams = teams.filter(team => currentUserTeams.includes(team.teamId));
            return { teams }
        } else {
            return [];
            // console.log("currentUser doesn't have teams.");
        }
    } else {
        // console.log("No teams data found in localStorage.");
    }


}

export default userTeams;