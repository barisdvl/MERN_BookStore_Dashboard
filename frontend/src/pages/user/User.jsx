import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  FileUpload,
} from "@mui/icons-material";
import "./user.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/" + userId);
      setUser(res.data.user);
    };
    fetchUser();
  }, [userId]);

  //İmage file preview function
  const loadFile = (event) => {
    event.preventDefault();
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  //submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const imgFile =
      event.target.img.files[0] != null ? event.target.img.files[0] : null;
    let formData = new FormData();
    formData.append("username", event.target.username.value);
    formData.append("full_name", event.target.full_name.value);
    formData.append("email", event.target.email.value);
    formData.append("phone", event.target.phone.value);
    formData.append("adress", event.target.adress.value);
    formData.append("img", imgFile);

    await axios.put("/users/" + user._id, formData, {}).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="userPage">
      <div className="userPageContainer">
        <h1 className="userContainerTitle">Edit User</h1>
        <Link to="/createUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.img} alt="" className="userShowImg" />
            <div className="useShowTopTitle">
              <span className="userShowFullname">{user.full_name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowInfoHeading">Account Details</span>

            <div className="userShowInfo">
              <PermIdentity className="userShowInfoIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>

            <span className="userShowInfoHeading">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowInfoIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>

            <div className="userShowInfo">
              <PhoneAndroid className="userShowInfoIcon" />
              <span className="userShowInfoTitle">
                {user.phone != null ? user.phone : "0 000 000 00 00"}
              </span>
            </div>

            <div className="userShowInfo">
              <LocationSearching className="userShowInfoIcon" />
              <span className="userShowInfoTitle">
                {user.adress != null ? user.adress : "No Adress Detail"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateHeading">Edit</span>
          <form
            id="editForm"
            onSubmit={handleSubmit}
            className="userUpdateForm"
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={user.full_name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={user.phone}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Adress</label>
                <input
                  type="text"
                  name="adress"
                  defaultValue={user.adress}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={user.img}
                  alt=""
                  id="output"
                  className="userUpdateImg"
                />
                <label htmlFor="img">
                  <FileUpload className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={loadFile}
                  style={{ display: "none" }}
                />
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
