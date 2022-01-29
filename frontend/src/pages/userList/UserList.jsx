import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import "./userList.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [delItem, setDelItem] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let getUsers = [];
    let idCounter = 0;
    const res = await axios.get("/users");

    res.data.users.map((user) => {
      if (!user.isAdmin) {
        idCounter += 1;
        return getUsers.push({
          id: idCounter,
          _id: user._id,
          username: user.username,
          full_name: user.full_name,
          email: user.email,
        });
      }
    });
    setUsers(getUsers);
  };

  const handleClickOpen = (itemId) => {
    setOpen(true);
    setDelItem(itemId);
  };

  const handleClose = () => {
    setOpen(false);
    setDelItem("");
  };

  const handleDelete = async () => {
    await axios.delete("/users/" + delItem).then(() => {
      fetchUsers();
    });
    setOpen(false);
    setDelItem("");
  };

  const alertDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you wish to delete this book?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img src={params.row.avatar} alt="" className="userListImg" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    { field: "full_name", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEditBtn">Edit</button>
            </Link>

            <DeleteOutline
              className="userListDeleteBtn"
              onClick={() => handleClickOpen(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userPageContainer">
        <h1 className="userContainerTitle">Users</h1>
        <Link to="/createUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      {alertDialog}
      <div className="userListTable">
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}
