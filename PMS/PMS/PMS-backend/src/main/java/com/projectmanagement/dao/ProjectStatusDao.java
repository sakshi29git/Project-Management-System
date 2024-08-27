package com.projectmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectmanagement.entity.Project;
import com.projectmanagement.entity.ProjectStatus;

@Repository
public interface ProjectStatusDao extends JpaRepository<ProjectStatus, Integer> {

	List<ProjectStatus> findByProjectOrderByIdDesc(Project project);

}
