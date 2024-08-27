import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { format, parse, parseISO } from 'date-fns'; // Import parse for different date formats
import 'react-toastify/dist/ReactToastify.css';

const ViewAllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/project/fetch");
        console.log("Projects fetched:", response.data.projects); // Inspect the data
        setAllProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    getAllProjects();
  }, []);

  const retrieveProjectsByName = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/project/search?projectName=${projectName}`);
      console.log("Projects fetched by name:", response.data.projects); // Inspect the data
      setAllProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects by name:", error);
      toast.error("Failed to fetch projects", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const retrieveProjectsById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/project/search/id?projectId=${projectId}`);
      console.log("Projects fetched by ID:", response.data.projects); // Inspect the data
      setAllProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects by ID:", error);
      toast.error("Failed to fetch projects", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const searchProjectByName = (e) => {
    e.preventDefault();
    retrieveProjectsByName();
    setProjectName("");
  };

  const searchProjectById = (e) => {
    e.preventDefault();
    retrieveProjectsById();
    setProjectId("");
  };

  const assignToManager = (project) => {
    navigate("/project/assign/manager", { state: project });
  };

  const viewProjectStatus = (project) => {
    navigate("/project/status/view", { state: project });
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/project/delete?projectId=${projectId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setAllProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      } else {
        toast.error("Failed to delete the project", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Function to format dates
  const formatDate = (date) => {
    try {
      if (!date) return 'Date not available'; // Handle empty dates

      // Attempt to parse the date as an ISO string
      const parsedDate = parseISO(date);

      if (isNaN(parsedDate.getTime())) {
        // If parsing as ISO fails, try parsing as a different format (e.g., 'MM/dd/yyyy')
        const fallbackParsedDate = parse(date, 'MM/dd/yyyy', new Date());
        if (isNaN(fallbackParsedDate.getTime())) {
          return 'Invalid Date'; // Return 'Invalid Date' if parsing fails
        }
        return format(fallbackParsedDate, 'yyyy-MM-dd');
      }

      return format(parsedDate, 'yyyy-MM-dd');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date'; // Handle unexpected errors
    }
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Projects</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="row g-3">
            <div className="col-auto">
              <form className="row g-3" onSubmit={searchProjectByName}>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="inputProjectName"
                    placeholder="Enter Project Name..."
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text mb-3"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-auto">
              <form className="row g-3" onSubmit={searchProjectById}>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="inputProjectId"
                    placeholder="Enter Project Id..."
                    onChange={(e) => setProjectId(e.target.value)}
                    value={projectId}
                    required
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text mb-3"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Description</th>
                  <th scope="col">Project Requirement</th>
                  <th scope="col">Manager Assign Status</th>
                  <th scope="col">Manager Name</th>
                  <th scope="col">Employee Assign Status</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Project Created Date</th>
                  <th scope="col">Project Assign Date</th>
                  <th scope="col">Project Deadline</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => (
                  <tr key={project.id}>
                    <td><b>{project.name}</b></td>
                    <td><b>{project.description}</b></td>
                    <td><b>{project.requirement}</b></td>
                    <td><b>{project.assignedToManager}</b></td>
                    <td><b>{project.managerName}</b></td>
                    <td><b>{project.assignedToEmployee}</b></td>
                    <td><b>{project.employeeName}</b></td>
                    <td><b>{formatDate(project.createdDate)}</b></td>
                    <td><b>{formatDate(project.assignedDate)}</b></td>
                    <td><b>{formatDate(project.deadlineDate)}</b></td>
                    <td><b>{project.projectStatus}</b></td>
                    <td>
                      {project.assignedToManager === "Not Assigned" ? (
                        <button
                          onClick={() => assignToManager(project)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          <b>Assign To Manager</b>
                        </button>
                      ) : (
                        <button
                          onClick={() => viewProjectStatus(project)}
                          className="btn btn-sm bg-color custom-bg-text mt-2"
                        >
                          <b>View Status</b>
                        </button>
                      )}
                      {/* Delete button */}
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="btn btn-sm bg-color custom-bg-text mt-2"
                      >
                        <b>Remove</b>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAllProjects;
