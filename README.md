# Project Management System
Overview
The Project Management System is a web-based application designed to streamline and manage project workflows within an organization. The system is built using Java Enterprise Edition, Spring Boot, React, and MySQL. It features role-based access control for Admins, Managers, and Employees, allowing efficient project creation, management, and task tracking.

Features
Role-Based Access:

Admin: Register managers, create projects, manage users and projects.
Manager: Add employees, manage project execution, monitor task progress.
Employee: Provide updates on activities, manage assigned tasks.
Project Management:

Create, assign, and track projects.
Manage deadlines and ensure timely task completion.
User Management:

Add, update, or delete users (Managers and Employees).
Control access based on roles.
Activity Tracking:

Employees can log activity details.
Managers can monitor and manage ongoing tasks.
Technology Stack
Backend: Java Enterprise Edition, Spring Boot
Frontend: React
Database: MySQL
Build Tool: Maven
Installation & Prerequisites:
Java Development Kit (JDK) 11 or higher
Node.js and npm
MySQL
Maven
Backend Setup


Clone the repository:
Copy code
git clone https://github.com/yourusername/project-management-system.git
Navigate to the backend directory:

Copy code
cd project-management-system/backend
Configure the application.properties file with your MySQL database settings.

Build the project using Maven:

Copy code
mvn clean install
Run the Spring Boot application:
Copy code
mvn spring-boot:run
Frontend Setup
Navigate to the frontend directory:
Copy code
cd project-management-system/frontend

Install dependencies:
Copy code
npm install

Start the React application:

Copy code
npm start

Database Setup
Create a MySQL database named project_management_system.
Run the provided SQL scripts located in the database folder to set up the required tables and initial data.
Usage
Access the application via http://localhost:3000.
Log in with the appropriate credentials:
Admin: Manages projects and user roles.
Manager: Oversees project execution and employee tasks.
Employee: Updates tasks and provides activity reports.
Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your enhancements.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

