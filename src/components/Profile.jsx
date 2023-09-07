import useAuth from "../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();
    return (
        <div>
            {user &&
                <div className="w-full mx-auto text-center">
                    <div className="flex justify-center">
                        <img className="h-24 w-24 rounded-full border-2 border-blue-600" src={user.profilePicture} alt="" />
                    </div>
                    <div className="text-white">
                        <p>{user.username}</p>
                        <p>{user.bio}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;