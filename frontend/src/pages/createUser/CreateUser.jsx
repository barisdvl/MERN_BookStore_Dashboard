import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./createUser.css";
export default function CreateUser() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", event.target.username.value);
    formData.append("full_name", event.target.full_name.value);
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    formData.append("phone", event.target.phone.value);
    formData.append("adress", event.target.adress.value);

    await axios.post("/users/register", formData, {}).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="createUser">
      <h1 className="newUserHeading">New User</h1>
      <form className="newUserForm" id="createUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" placeholder="username" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" name="full_name" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder="mail@mail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+90 123 456 78 90" />
        </div>
        <div className="newUserItem">
          <label>Adress</label>
          <input type="text" name="adress" placeholder="Muğla/Turkey" />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
