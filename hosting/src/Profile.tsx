import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase.tsx";
import { signOut } from "firebase/auth";
import Schedulerr from "./Schedulerr.tsx";
import DatePicker from "./DatePicker.tsx";

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <div className = "col-md-10 text-center">
                    <p>Welcome <em className = "text-decoration-underline">{ user.displayName }</em>. You are logged in!</p>
                        <Schedulerr />
                </div>
                <div className = "row mt-5">
                    <DatePicker />
                </div>
            </div>
            <div className = "row fixed-bottom">
            <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => logoutUser(e)}>Logout</button>
            </div>
        </div>
    )
}

export default Profile
