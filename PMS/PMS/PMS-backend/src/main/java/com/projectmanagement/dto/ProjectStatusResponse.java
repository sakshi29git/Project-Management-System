package com.projectmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.projectmanagement.entity.ProjectStatus;

import lombok.Data;

@Data
public class ProjectStatusResponse extends CommonApiResponse {

	private List<ProjectStatus> statuses = new ArrayList<>();

}
