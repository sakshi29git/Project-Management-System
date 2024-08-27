package com.projectmanagement.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.BeanUtils;

import com.projectmanagement.dto.UserLoginResponse;

import lombok.Data;

@Entity
@Data
@Table(name="User_details")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String firstName;
	
	private String lastName;
	
//	private int age;
	
	private String sex;
	
	private String emailId;
	
	private String contact;
	
	@Column(name="Department")
	private String street;
	
	@Column(name="Designation")
	private String city;
	
	
	
	private String password;
	
	private String role;
	
	private int status;

	public static UserLoginResponse toUserLoginResponse(User user) {
		UserLoginResponse userLoginResponse=new UserLoginResponse();
		BeanUtils.copyProperties(user, userLoginResponse, "password");		
		return userLoginResponse;
	}
	
}
