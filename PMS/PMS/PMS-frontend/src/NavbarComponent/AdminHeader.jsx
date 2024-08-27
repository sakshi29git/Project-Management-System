import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../AdminHeader.module.css'; // Import the CSS module

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    
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
          to="/user/manager/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>Register Manager</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/admin/project/add"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>Add Project</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/admin/project/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>All Projects</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/admin/manager/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className={styles.textColor}>View Managers</b>
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
          onClick={adminLogout}
        >
          <b className={styles.textColor}>Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
