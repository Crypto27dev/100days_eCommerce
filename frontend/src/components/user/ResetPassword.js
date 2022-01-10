import './ResetPassword.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import MetaData from '../layout/MetaData';
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import {
    clearErrors,
    resetPassword
} from '../../redux/actions/userAction';

function ResetPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { token } = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate("/login");
        }

        return () => { }

    }, [
        dispatch, error, alert, navigate, success
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
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className="resetPasswordHeading">Create New Password</h2>

                                <form
                                    className="resetPasswordForm"
                                    onSubmit={resetPasswordSubmit}
                                >
                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                        value="Update"
                                        className="resetPasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default ResetPassword;
