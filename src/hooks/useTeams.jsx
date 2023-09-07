const userTeams = () => {
    let teams = localStorage.getItem('teams')
    if (teams) {
        teams = JSON.parse(teams)
    }
    return { teams }
}

export default userTeams;