import './ForgotPassword.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import MetaData from '../layout/MetaData';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
    clearErrors,
    forgotPassword
} from '../../redux/actions/userAction';

function ForgotPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, message } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }

        return () => { }

    }, [dispatch, error, alert, message]);

    return (
        <div style={{
            marginTop: 80
        }}>

            {
                loading ?
                    <Loader fullScreen={true} />
                    :
                    <div>
                        <MetaData title="Forgot Password" />
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox">
                                <h2 className="forgotPasswordHeading">Forgot Password</h2>

                                <form
                                    className="forgotPasswordForm"
                                    onSubmit={forgotPasswordSubmit}
                                >
                                    <div className="forgotPasswordEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Send"
                                        className="forgotPasswordBtn"
                                    />
                                    <Link to="/login">Login to account</Link>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default ForgotPassword;
