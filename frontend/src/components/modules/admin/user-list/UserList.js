import "./ProductList.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SideBar from "./Sidebar";
import MetaData from "../../../layout/MetaData";
import { DELETE_USER_RESET } from "../../../../redux/constants/userConstants";
import {
    getAllUsers, clearErrors, deleteUser
} from "../../../../redux/actions/userAction";


function UserList() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    const columns = [

        {
            field: "ind",
            headerName: "No.",
            minWidth: 100,
            flex: 0.5
        },

        {
            field: "id",
            headerName: "User ID",
            minWidth: 180,
            flex: 0.8
        },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item, i) => {
            rows.push({
                ind: (i + 1),
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());

        return () => { }

    }, [
        dispatch, alert, error, deleteError,
        navigate, isDeleted, message
    ]);

    return (
        <div style={{
            marginTop: 80
        }}>

            <MetaData title={`All Users - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>

        </div>
    )
}

export default UserList;
