package com.taskmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.ProjectStatus;

@Repository
public interface ProjectStatusDao extends JpaRepository<ProjectStatus, Integer> {

	List<ProjectStatus> findByProjectOrderByIdDesc(Project project);

}
