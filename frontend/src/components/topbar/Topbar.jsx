import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  LogoutOutlined,
} from "@mui/icons-material";

export default function Topbar({ setLogin }) {
  const logout = async () => {
    setLogin("");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">BD Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <button onClick={logout} className="topbarLogoutBtn">
              <LogoutOutlined />
            </button>
          </div>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQFEGf7FqyFMsA/profile-displayphoto-shrink_800_800/0/1637518357355?e=1648080000&v=beta&t=PF2QQUB-V7uaJcKAGf-iynfgTM47TxCp8OsJhrZ1VUo"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
