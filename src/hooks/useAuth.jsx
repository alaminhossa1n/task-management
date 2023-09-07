import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const update = () => {
    const u = localStorage.getItem("authenticatedUser");
    if (u) {
      setUser(JSON.parse(u));
    } else {
      setUser(null);
    }
  };

  // add user
  const addUser = (email, password, username, profilePicture, bio) => {
    let users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);

      // Check if a user with the same email already exists
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        alert(
          "User with this email already exists. Please log in or use a different email."
        );
        return;
      }
    } else {
      users = [];
    }

    users.push({ email, password, username, profilePicture, bio });
    localStorage.setItem("users", JSON.stringify(users));
  };


  const loginUser = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users"));

    const userExists = users.find((u) => u.email === email && u.password === password);
    console.log(userExists);

    if (userExists) {
      localStorage.setItem("authenticatedUser", JSON.stringify(userExists));
      navigate('/')
      update();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authenticatedUser");
    update();
  };

  useEffect(() => {
    update();
  }, []);

  return { user, update, addUser, loginUser, logoutUser };
};

export default useAuth;