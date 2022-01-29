import { Link } from "react-router-dom";
import {
  LineStyle,
  TrendingUp,
  PersonOutline,
  Storefront,
  BarChart,
  MailOutline,
  WorkOutline,
} from "@mui/icons-material";
import "./sidebar.css";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("");

  const hoverSide = (event) => {
    //event.preventDefault(); when I use it Link is not working
    let nameOfItem = event.target.getAttribute("name");
    setActive(nameOfItem);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  "sidebarListItem" + (active === "home" ? " active" : "")
                }
                name="home"
                onClick={hoverSide}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={
                  "sidebarListItem" + (active === "product" ? " active" : "")
                }
                name="product"
                onClick={hoverSide}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/users" className="link">
              <li
                className={
                  "sidebarListItem" + (active === "users" ? " active" : "")
                }
                name="users"
                onClick={hoverSide}
              >
                <PersonOutline className="sidebarIcon" />
                Users
              </li>
            </Link>
            <li
              className={
                "sidebarListItem" + (active === "sales" ? " active" : "")
              }
              name="sales"
              onClick={hoverSide}
            >
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>

            <li
              className={
                "sidebarListItem" + (active === "transactions" ? " active" : "")
              }
              name="transactions"
              onClick={hoverSide}
            >
              <TrendingUp className="sidebarIcon" />
              Transactions
            </li>
            <li
              className={
                "sidebarListItem" + (active === "reports" ? " active" : "")
              }
              name="reports"
              onClick={hoverSide}
            >
              <BarChart className="sidebarIcon" />
              Reports
            </li>
            <li
              className={
                "sidebarListItem" + (active === "mail" ? " active" : "")
              }
              name="mail"
              onClick={hoverSide}
            >
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li
              className={
                "sidebarListItem" + (active === "manage" ? " active" : "")
              }
              name="manage"
              onClick={hoverSide}
            >
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
