import './UpdateProfile.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { BiArrowBack } from 'react-icons/bi';
import { MdFace, MdMale } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import {
    clearErrors,
    updateProfile,
    loadUser
} from '../../../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../../../redux/constants/userConstants';
import Loader from "../../../layout/loader/Loader";
import MetaData from '../../../layout/MetaData';
import AppWrap from '../../../hoc/AppWrap';


function UpdateProfile() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.user);
    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        if (name) myForm.set("name", name);
        if (gender) myForm.set("gender", gender);
        if (dob) myForm.set("dob", dob);
        if (avatar) myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm, token));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {

        if (user) {
            setName(user.name);
            setGender(user.gender);
            setDOB(user.dob);
            setAvatarPreview(user.avatar?.url || "/Profile.png");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully.");
            dispatch(loadUser(token));

            navigate("/user/profile");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }

        return () => { }
    }, [
        alert, dispatch, error, isUpdated,
        navigate, user, token
    ])

    return (
        <div className="app__top-margin">

            <div className="app__flex-container">

                <MetaData title="Update Profile - NixLab Shop" />

                <form
                    className="app__flex"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >

                    {
                        loading &&
                        <Loader />
                    }

                    <p className="title">
                        Update Profile
                    </p>

                    <img className='preview-img'
                        src={avatarPreview}
                        alt="Avatar Preview"
                    />

                    <div className="file-input">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            disabled={loading}
                            onChange={updateProfileDataChange}
                        />
                    </div>

                    <div className="form-control">
                        <MdFace />
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            disabled={loading}
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <MdMale />
                        <select onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            disabled={loading}
                        >
                            <option value="" disabled={loading}>Select</option>
                            <option value="Male" disabled={loading}>Male</option>
                            <option value="Female" disabled={loading}>Female</option>
                            <option value="Others" disabled={loading}>Others</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <FaBirthdayCake />
                        <input
                            type="date"
                            placeholder="DOB"
                            disabled={loading}
                            min="1950-01-01"
                            max="2016-12-31"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Update"
                        disabled={loading}
                        className="rounded-filled-btn"
                        style={{
                            marginTop: 20
                        }}
                    />

                    <div className="form-control"
                        style={{
                            margin: 0,
                            marginTop: 20
                        }}
                    >
                        <Link to="/user/profile"><BiArrowBack /> Back to Profile</Link>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default AppWrap(UpdateProfile);
