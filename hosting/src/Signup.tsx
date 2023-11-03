import React, { useState } from "react";
import { db, auth } from "./Firebase.tsx";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gamesGMd, setGamesGMd] = useState([]);
    const [group, setGroup] = useState("");
    const [timezone, setTimezone] = useState("");
    const [notice, setNotice] = useState("");

    const handleAddGame = () => {
        const updatedGames = [...gamesGMd, ""];
        setGamesGMd(updatedGames);
    };

    const handleRemoveGame = (index) => {
        const updatedGames = [...gamesGMd];
        updatedGames.splice(index, 1);
        setGamesGMd(updatedGames);
    };

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

         if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    set(ref(db, 'users/' + userCredential.user.uid), {
                            gamesGMd: gamesGMd,
                            timezone: timezone,
                    });
                    set(ref(db, 'groups/' + group + '/'), {
                            members: [userCredential.user.uid]
                        });
                    updateProfile( userCredential.user, {
                        displayName: username,
                    }).then(() => {
                        console.log("User profile updated successfully");
                        navigate("/");
                    }).catch((error) => {
                        console.error("Error updating user profile:", error);
                    });
                });
            } catch (error) {
                console.error("Error creating user:", error);
                setNotice("Sorry, something went wrong. Please try again.");
            }
        } else {
            setNotice("Passwords don't match. Please try again.");
        }
    };

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <form className = "col-md-4 mt-3 pt-3 pb-3">
                    { "" !== notice &&
                        <div className = "alert alert-warning" role = "alert">
                            { notice }
                        </div>
                    }
                    <div className = "form-floating mb-3">
                        <input id = "signupUsername" type = "text" className = "form-control" placeholder = "Username" value = { username } onChange = { (e) => setUsername(e.target.value) }></input>
                        <label htmlFor = "signupUsername" className = "form-label">Username</label>
                    </div>
                    <div className = "form-floating mb-3">
                        <input id = "signupEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                        <label htmlFor = "signupEmail" className = "form-label">Enter an email address for your username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <h5>Add GM'd games... 
                        <button type="button" className="btn btn-outline-success" onClick={handleAddGame}>
                            +
                        </button></h5>
                        {gamesGMd.map((game, index) => (
                            <div className="input-group mb-4" key={index}>
                                <input
                                    className="input-group-text"
                                    type="text"
                                    value={game}
                                    onChange={(e) => {
                                        const updatedGames = [...gamesGMd];
                                        updatedGames[index] = e.target.value;
                                        setGamesGMd(updatedGames);
                                    }}
                                />
                                <button type="button" className="input-group-append btn btn-outline-danger" onClick={() => handleRemoveGame(index)}>
                                    -
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            id="group"
                            type="text"
                            className="form-control"
                            placeholder="Group"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        ></input>
                        <label htmlFor="group" className="form-label">
                            Group
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <p>Timezone</p>
                        <TimezoneSelect
                            value={timezone}
                            onChange={(e) => setTimezone(e.value)}
                            id = "timezone"
                        />
                    </div>
                    <div className = "form-floating mb-3">
                        <input id = "signupPassword" type = "password" className = "form-control" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                        <label htmlFor = "signupPassword" className = "form-label">Password</label>
                    </div>
                    <div className = "form-floating mb-3">
                        <input id = "confirmPassword" type = "password" className = "form-control" placeholder = "Confirm Password" value = { confirmPassword } onChange = { (e) => setConfirmPassword(e.target.value) }></input>
                        <label htmlFor = "confirmPassword" className = "form-label">Confirm Password</label>
                    </div>
                    <div className = "d-grid">
                        <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => signupWithUsernameAndPassword(e)}>Signup</button>
                    </div>
                    <div className = "mt-3 text-center">
                        <span>Go back to login? <Link to = "/">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
