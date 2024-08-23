package com.taskmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.taskmanagement.entity.ProjectStatus;

import lombok.Data;

@Data
public class ProjectStatusResponse extends CommonApiResponse {

	private List<ProjectStatus> statuses = new ArrayList<>();

}
