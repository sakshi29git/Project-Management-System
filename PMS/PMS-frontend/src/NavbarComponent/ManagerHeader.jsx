import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../AdminHeader.module.css'; // Import the CSS module

const ManagerHeader = () => {
  let navigate = useNavigate();

  // Retrieve user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("active-manager")) || {}; // Default to empty object if null
  console.log(user);

  // Handle manager logout
  const managerLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Remove session storage items
    sessionStorage.removeItem("active-manager");
    sessionStorage.removeItem("manager-jwtToken");

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/user/manager/project/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>My Projects</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/employee/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>Register Employee</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/employee/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>View All Employees</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/change/password"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>Change Password</b>
        </Link>
      </li>

      {/* Display user info if available */}
      {user && user.role && user.firstName && (
        <li className="nav-item">
          <span className="nav-link">
            <b className={`${styles.textColor} ${styles.highlightedText}`}>
              {capitalizeFirstLetter(user.role)} {user.firstName}
            </b>
          </span>
        </li>
      )}

      <li className="nav-item">
        <Link
          to="#"
          className="nav-link active"
          aria-current="page"
          onClick={managerLogout}
        >
          <b className={styles.textColor}>Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default ManagerHeader;
