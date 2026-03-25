# Employee Management System 👨‍💼👩‍💼

A modern, modular, browser-based Employee Management System built with vanilla HTML, CSS, Bootstrap, and JavaScript. This application allows an admin to manage employee records with full CRUD operations, all without a backend server, demonstrating a clean, service-oriented architecture.

<p align="center">
  <img src="https://drive.google.com/file/d/13nTdGZBdCOVBgqGqHi5VTk5uwpb_OhDv/view?usp=drive_link" alt="Employee Management System Dashboard" width="600"/>
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

## 🎯 Validation Rules
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

📈 Evaluation Criteria
<div align="center">
Dimension	Focus	Marks
Functional Requirements	All features work correctly end to end	40
UI/UX Design	Responsive, consistent, user-friendly interface	25
Code Architecture	Modular services, clean separation of concerns	20
Testing & Edge Cases	Unit tests pass, validation correct	15
Total		100
</div>


</div> ```
