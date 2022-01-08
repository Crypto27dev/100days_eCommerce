import Rating from '@mui/material/Rating';
import profilePng from "../../assets/images/Profile.png";

function ReviewCard({ review }) {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
}

export default ReviewCard;
