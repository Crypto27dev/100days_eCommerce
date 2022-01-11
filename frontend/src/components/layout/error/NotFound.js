import './NotFound.css';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function NotFound() {
    return (
        <div className="PageNotFound"
            style={{
                marginTop: 80
            }}>
            <ErrorIcon />

            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>

        </div>
    )
}

export default NotFound;
