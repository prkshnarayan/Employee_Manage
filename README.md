# Employee Management System 👨‍💼👩‍💼

A modern, modular, browser-based Employee Management System built with vanilla HTML, CSS, Bootstrap, and JavaScript. This application allows an admin to manage employee records with full CRUD operations, all without a backend server, demonstrating a clean, service-oriented architecture.

<p align="center">
  <img src="https://d11ldeo2m6pbdo.cloudfront.net/d36a14a3-a39c-4a0d-80d6-ffb9af199104-Screenshot-2026-03-11-140316.png" alt="Employee Management System Dashboard" width="600"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#testing">Testing</a> •
  <a href="#evaluation-criteria">Evaluation</a>
</p>

---

## 📌 Demo

Experience the live demo of the project here:  
👉 [![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-blue)](https://your-username.github.io/employee-management-system/)

---

## ✨ Features

### 🎯 Core Functionality
| Feature | Description |
|---------|-------------|
| **🔐 Admin Authentication** | Secure Signup & Login with validation (unique usernames, password matching, min. 6 characters) |
| **📊 Interactive Dashboard** | Real-time summary cards with employee counts, department-wise breakdown, and recent employees |
| **📝 Full CRUD Operations** | Add, View, Edit, and Delete employee records with comprehensive form validation |
| **🔍 Search & Filter** | Real-time search by name/email, filter by department and status (Active/Inactive) |
| **⬆️ Sorting** | Sort employee list by Name, Salary, or Join Date in both ascending and descending order |
| **📱 Responsive Design** | Fully responsive layout using Bootstrap 5 that works on desktop, tablet, and mobile |

### 🚀 Technical Features
- ✅ **Modular Architecture** - Code is split into single-responsibility service modules (auth, employee, validation, etc.)
- ✅ **No Page Reloads** - All UI updates are handled dynamically via DOM manipulation
- ✅ **In-Memory Data Store** - Employee data is managed via a `storageService` wrapper over a `data.js` array
- ✅ **Session Simulation** - Authentication state is managed in-memory to secure dashboard access
- ✅ **Comprehensive Validation** - Client-side validation with field-level error messages
- ✅ **Toast Notifications** - Bootstrap toast messages for success/error feedback
- ✅ **Modal Dialogs** - Clean modal interfaces for all CRUD operations
- ✅ **Unit Testing Ready** - Jest test suite for core service modules

## 🛠️ Tech Stack

<div align="center">
  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

</div>

## 📁 Project Structure
employee-management-dashboard/
│
├── 📄 index.html # Main application file (contains all views)
│
├── 📁 css/
│ └── 📄 styles.css # Custom styles and overrides
│
├── 📁 js/
│ ├── 📄 data.js # Hardcoded employee (15+ records) and admin data
│ ├── 📄 storageService.js # In-memory read/write interface for data
│ ├── 📄 authService.js # Admin signup/login logic
│ ├── 📄 employeeService.js # Business logic for employee CRUD
│ ├── 📄 validationService.js# Form validation rules
│ ├── 📄 dashboardService.js # Dashboard statistics calculation
│ ├── 📄 uiService.js # DOM manipulation and UI updates
│ └── 📄 app.js # Main application initializer
│
├── 📁 tests/
│ ├── 📄 employeeService.test.js
│ ├── 📄 authService.test.js
│ └── 📄 dashboardService.test.js
│
├── 📄 package.json # For running unit tests
├── 📄 jest.config.js # Jest configuration
└── 📄 README.md # Project documentation

text

## 📄 Pages Overview

<div align="center">

| Section | Description | Key Features |
|---------|-------------|--------------|
| **🔐 Signup** | Admin registration | Username, password, confirm password, unique username validation |
| **🔑 Login** | Admin authentication | Credential validation, session management |
| **📊 Dashboard** | Workforce insights | Summary cards, department stats, recent employees list |
| **👥 Employee List** | Employee management | Search, filter, sort, CRUD actions, data table |
| **➕ Add/Edit Employee** | Employee forms | Modal forms with validation for all employee fields |

</div>

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, only required to run unit tests)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/employee-management-system.git

# Navigate to project directory
cd employee-management-system

# Open with live server (using npx)
npx live-server

# OR using Python
python -m http.server 8000

# OR simply open index.html in your browser
📖 Usage Guide
1. Admin Signup 🔐
javascript
// Navigate to Signup page
// Enter a unique username (e.g., "admin")
// Enter password (min. 6 characters)
// Confirm password
// On success, redirect to Login page with toast notification
2. Admin Login 🔑
javascript
// Enter registered username and password
// On successful login, session flag is set
// Redirect to Dashboard view
3. View Dashboard 📊
javascript
// Dashboard displays:
// - Total, Active, and Inactive employee counts
// - Department-wise employee distribution (Engineering, Marketing, HR, Finance, Operations)
// - List of 5 most recently added employees
// All data updates in real-time as employees are added/modified
4. Manage Employees ✏️
javascript
// Navigate to Employees section
// View complete employee list with ID, Name, Email, Department, Designation, Salary, Join Date, Status
// 
// SEARCH: Type in search box to filter by name or email
// FILTER: Use department dropdown and Active/Inactive toggle
// SORT: Click column headers (Name, Salary, Join Date) to sort
//
// ADD: Click "Add Employee" button → Fill modal form → Save
// VIEW: Click eye icon to see employee details in read-only modal
// EDIT: Click pencil icon → Modify information in modal → Save
// DELETE: Click trash icon → Confirm deletion → Employee removed
5. Logout 🚪
javascript
// Click "Logout" button in navigation bar
// Session flag cleared
// Redirect to Login page
🧪 Testing
The project includes comprehensive unit tests using Jest to verify the core business logic.

Test Coverage
Service	Tests
authService	Signup validation, duplicate username, login validation, session management
employeeService	Add, edit, delete, get by ID, search, filter, sort operations
dashboardService	Statistics calculation, department distribution, recent employees
Run Tests
bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
📊 Employee Data Model
<div align="center">
Field	Type	Description	Example
id	Number	Auto-incremented identifier	1
firstName	String	Employee's first name	"Priya"
lastName	String	Employee's last name	"Menon"
email	String	Unique work email	"priya.menon@XYZ.com"
phone	String	10-digit contact number	"9876543210"
department	String	Engineering, Marketing, HR, Finance, Operations	"Engineering"
designation	String	Job title	"Software Engineer"
salary	Number	Annual salary (positive number)	750000
joinDate	String	Date of joining (YYYY-MM-DD)	"2022-06-15"
status	String	'Active' or 'Inactive'	"Active"
</div>
🎯 Validation Rules
Signup Form
javascript
- All fields required
- Username must be unique
- Password minimum 6 characters
- Password and Confirm Password must match
Employee Form
javascript
- All fields required
- Email must be unique
- Phone must be exactly 10 digits
- Salary must be positive number
- Join Date cannot be future date
- Department must be from predefined list
- Status must be 'Active' or 'Inactive'
📸 Screenshots
<div align="center">
🖥️ Application Views
Signup Page	Login Page	Dashboard
<img src="https://d11ldeo2m6pbdo.cloudfront.net/9ab1f8d6-9f7e-4cf8-887f-a69a86a598e8-Screenshot-2026-03-11-140349.png" width="300" alt="Signup Page">	<img src="https://d11ldeo2m6pbdo.cloudfront.net/9dbcdf5a-22b7-4f8c-86d6-6c2ca00928cb-Screenshot-2026-03-11-140330.png" width="300" alt="Login Page">	<img src="https://d11ldeo2m6pbdo.cloudfront.net/d36a14a3-a39c-4a0d-80d6-ffb9af199104-Screenshot-2026-03-11-140316.png" width="300" alt="Dashboard">
Employee List	Add Employee	Edit Employee
<img src="https://d11ldeo2m6pbdo.cloudfront.net/302c0d7e-5bfa-4f1c-92fc-1d365c92e203-Screenshot-2026-03-11-140302.png" width="300" alt="Employee List">	<img src="https://d11ldeo2m6pbdo.cloudfront.net/6b150477-90ab-4d05-ad0d-8a300a8e42ae-Screenshot-2026-03-11-140243.png" width="300" alt="Add Employee">	<img src="https://d11ldeo2m6pbdo.cloudfront.net/a084f108-d8ce-4a0b-8d81-edd96b7608dd-Screenshot-2026-03-11-140215.png" width="300" alt="Edit Employee">
View Employee	Delete Confirmation
<img src="https://d11ldeo2m6pbdo.cloudfront.net/78ca4f57-4051-49a2-b3d3-e3f3da7eef34-Screenshot-2026-03-11-140229.png" width="300" alt="View Employee">	<img src="https://d11ldeo2m6pbdo.cloudfront.net/4d872b4a-3982-4ebb-8b2d-a3677652f7d9-Screenshot-2026-03-11-140150.png" width="300" alt="Delete Confirmation">
</div>
📈 Evaluation Criteria
<div align="center">
Dimension	Focus	Marks
Functional Requirements	All features work correctly end to end	40
UI/UX Design	Responsive, consistent, user-friendly interface	25
Code Architecture	Modular services, clean separation of concerns	20
Testing & Edge Cases	Unit tests pass, validation correct	15
Total		100
</div>
🔧 Future Enhancements
Backend Integration - Replace hardcoded data with .NET Core Web API

JWT Authentication - Implement token-based authentication

SQL Server Database - Persist data across sessions

Advanced Reporting - Generate employee reports and analytics charts

Role-Based Access - Different permissions for HR, Managers, and Admins

Export Functionality - Export employee list to Excel/PDF

Bulk Operations - Import employees via CSV

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Your Name - Initial work - GitHub

<div align="center">
📞 Contact
https://img.shields.io/badge/Email-your.email%2540example.com-red?style=for-the-badge&logo=gmail
https://img.shields.io/badge/Portfolio-Your-Portfolio-blue?style=for-the-badge&logo=google-chrome
https://img.shields.io/badge/GitHub-Employee--Management--System-black?style=for-the-badge&logo=github

</div>
<div align="center">
⭐ Star this repository if you find it helpful!
Happy Coding! 🚀

</div> ```
