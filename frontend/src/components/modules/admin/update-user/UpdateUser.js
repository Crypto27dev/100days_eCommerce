import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import {
    getUserDetails,
    updateUser,
    clearErrors,
} from "../../redux/actions/userAction";


function UpdateUser() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm));
    };

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [
        dispatch, alert, error, navigate,
        isUpdated, updateError, user, id
    ]);

    return (
        <div style={{
            marginTop: 80
        }}>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading ? true : false || role === "" ? true : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;
