package com.projectmanagement.dto;

import lombok.Data;

@Data
public class UpdateProjectRequestDto {
	
	private int projectId;
	
	private int managerId;
	
	private int employeeId;
	
	private String projectStatus;

}
