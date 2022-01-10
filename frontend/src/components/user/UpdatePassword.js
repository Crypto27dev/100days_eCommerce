import './UpdatePassword.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import MetaData from '../layout/MetaData';
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
    clearErrors,
    updatePassword
} from '../../redux/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants';

function UpdatePassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");

            navigate("/account");

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }

        return () => { }

    }, [
        dispatch, error, alert, navigate, isUpdated
    ]);

    return (
        <div style={{
            marginTop: 80
        }}>

            {
                loading ?
                    <Loader fullScreen={true} />
                    :
                    <div>
                        <MetaData title="Change Password" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className="updatePasswordHeading">Update Password</h2>

                                <form
                                    className="updatePasswordForm"
                                    onSubmit={updatePasswordSubmit}
                                >
                                    <div className="loginPassword">
                                        <VpnKeyIcon />
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Change"
                                        className="updatePasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default UpdatePassword;
