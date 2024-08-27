import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../AdminHeader.module.css'; // Import the CSS module

const EmployeeHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-employee"));
  console.log(user);

  const employeeLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-employee");
    sessionStorage.removeItem("employee-jwtToken");
    window.location.reload(true);
    navigate("/home");
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
          to="/user/employee/project/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>My Projects</b>
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

      {user && (
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
          to=""
          className="nav-link active"
          aria-current="page"
          onClick={employeeLogout}
        >
          <b className={styles.textColor}>Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default EmployeeHeader;
