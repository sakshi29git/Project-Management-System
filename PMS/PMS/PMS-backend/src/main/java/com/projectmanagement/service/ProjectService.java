package com.projectmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanagement.dao.ProjectDao;
import com.projectmanagement.entity.Project;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectDao projectDao;
	
	public Project addProject(Project project) {
		return projectDao.save(project);
	}
	
	public Project updateProject(Project project) {
		return projectDao.save(project);
	}
	
	public List<Project> getAllProjects() {
		return projectDao.findAll();
	}
	
	public Project getProjectById(int projectId) {
		
		Project p = null;
		
		Optional<Project> oP = projectDao.findById(projectId);
		
		if(oP.isPresent()) {
			p = oP.get();
		}
		
		return p;
	}
	
	public List<Project> getAllProjectsByProjectName(String projectName) {
		return projectDao.findByNameContainingIgnoreCase(projectName);
	}
	
	public List<Project> getAllProjectsByProjectNameAndManagerId(String projectName, int managerId) {
		return projectDao.findByNameContainingIgnoreCaseAndManagerId(projectName, managerId);
	}
	
	public List<Project> getAllProjectsByProjectNameAndEmployeeId(String projectName, int employeeId) {
		return projectDao.findByNameContainingIgnoreCaseAndEmployeeId(projectName, employeeId);
	}
	
	public List<Project> getAllProjectsByEmployeeId(int employeeId) {
		return projectDao.findByEmployeeId(employeeId);
	}
	
	public List<Project> getAllProjectsByManagerId(int managerId) {
		return projectDao.findByManagerId(managerId);
	}

	public boolean deleteProject(int projectId) {
        try {
            if (projectDao.existsById(projectId)) {
                projectDao.deleteById(projectId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            // Log the exception
            return false;
        }
    }
}
