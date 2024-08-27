import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../UserRegister.module.css'; // Updated import

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    role: "",
    sex: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (document.URL.indexOf("admin") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "admin" }));
    } else if (document.URL.indexOf("manager") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "manager" }));
    } else if (document.URL.indexOf("employee") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "employee" }));
    }
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to ${value}`); // Debugging line
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthValid || !hasLetter || !hasNumber || !hasSpecialChar) {
      setPasswordError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
    } else {
      setPasswordError("");
    }
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();

    if (passwordError) {
      toast.error(passwordError, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/user/" + user.role + "/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      result.json().then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/login");
          }, 1000); // Redirect after 1 second
        } else {
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Reload after 1 second
        }
      });
    });


  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <div className="mt-4 d-flex align-items-center justify-content-center">
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h5 className="card-title">Register {capitalizeFirstLetter(user.role)}</h5>
          </div>
          <div className="card-body">
            <form className={`row g-3 ${styles.row}`} onSubmit={saveUser}>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="firstName" className="form-label">
                  <b>First Name</b>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="lastName" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="emailId" className="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className={styles.formControl}
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className={`${styles.formControl} ${passwordError ? styles.borderDanger : ''}`}
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                  required
                />
                {passwordError && <small className="text-danger">{passwordError}</small>}
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="street" className="form-label">
                  <b>Department</b>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="street"
                  name="street"
                  onChange={handleUserInput}
                  value={user.street}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="city" className="form-label">
                  <b>Designation</b>
                </label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                  required
                />
              </div>
              <div className={`col-md-6 mb-3 ${styles.colMd6}`}>
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className={styles.formControl}
                  name="sex"
                  required
                >
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className={styles.btn}
                  value="Register User"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
