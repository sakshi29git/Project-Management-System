package com.projectmanagement.dto;

import lombok.Data;

@Data
public class ProjectStatusAddRequest {

	private int projectId;

	private String status;
	
	private int employeeId;

}
