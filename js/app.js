/**
 * app.js - Application entry point and event orchestrator
 * No business logic, only event handling and service coordination
 */

$(document).ready(function() {
    // Initialize Bootstrap components
    let employeeModal, viewModal, deleteModal, toastInstance;
    
    try {
        employeeModal = new bootstrap.Modal(document.getElementById('employeeModal'));
        viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
        deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        toastInstance = new bootstrap.Toast(document.getElementById('toast'), {
            animation: true,
            autohide: true,
            delay: 3000
        });
    } catch (e) {
        console.error('Error initializing modals:', e);
    }
    
    // Store current delete ID
    let currentDeleteId = null;
    
    // Initialize UI
    initializeUI();
    
    /**
     * Initialize the application UI
     */
    function initializeUI() {
        try {
            updateAuthUI();
        } catch (e) {
            console.error('Error initializing UI:', e);
        }
    }
    
    /**
     * Update UI based on authentication state
     */
    function updateAuthUI() {
        const isLoggedIn = AuthService.isLoggedIn();
        
        if (isLoggedIn) {
            $('#loginSection, #signupSection').hide();
            $('#appSection').fadeIn(300);
            refreshDashboard();
            refreshEmployeeList();
            populateDepartmentFilter();
            setActiveNav('dashboard');
        } else {
            $('#appSection').hide();
            $('#loginSection').fadeIn(300);
            $('#signupSection').hide();
            clearAuthForms();
        }
    }
    
    /**
     * Show login section, hide signup
     */
    function showLogin() {
        $('#signupSection').fadeOut(200, function() {
            $('#loginSection').fadeIn(300);
            clearAuthForms();
        });
    }
    
    /**
     * Show signup section, hide login
     */
    function showSignup() {
        $('#loginSection').fadeOut(200, function() {
            $('#signupSection').fadeIn(300);
            clearAuthForms();
        });
    }
    
    /**
     * Clear authentication forms and errors
     */
    function clearAuthForms() {
        $('#loginForm')[0]?.reset();
        $('#signupForm')[0]?.reset();
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
        $('#loginError, #signupError').addClass('d-none');
        $('#loginSpinner, #signupSpinner').addClass('d-none');
        $('#loginBtn, #signupBtn').prop('disabled', false);
    }
    
    /**
     * Set active navigation item
     */
    function setActiveNav(view) {
        if (view === 'dashboard') {
            $('#navDashboard').addClass('active');
            $('#navEmployees').removeClass('active');
            $('#dashboardView').show();
            $('#employeeListView').hide();
        } else {
            $('#navEmployees').addClass('active');
            $('#navDashboard').removeClass('active');
            $('#employeeListView').show();
            $('#dashboardView').hide();
        }
    }
    
    /**
     * Refresh dashboard data
     */
    function refreshDashboard() {
        showDashboardLoading();
        
        // Simulate async loading
        setTimeout(() => {
            try {
                const summary = DashboardService.getSummary();
                const deptBreakdown = DashboardService.getDepartmentBreakdown();
                const recentEmployees = DashboardService.getRecentEmployees();
                
                renderDashboardCards(summary);
                renderDepartmentBreakdown(deptBreakdown);
                renderRecentEmployees(recentEmployees);
            } catch (e) {
                console.error('Error refreshing dashboard:', e);
                showToast('Error loading dashboard data', 'error');
            }
        }, 500);
    }
    
    /**
     * Show dashboard loading state
     */
    function showDashboardLoading() {
        $('#totalEmployees, #activeEmployees, #inactiveEmployees, #totalDepartments').text('...');
        
        $('#departmentBreakdown').html(`
            <div class="text-center text-muted py-4">
                <div class="spinner-border text-primary mb-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0">Loading department data...</p>
            </div>
        `);
        
        $('#recentEmployees').html(`
            <div class="text-center text-muted py-4">
                <div class="spinner-border text-primary mb-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0">Loading recent employees...</p>
            </div>
        `);
    }
    
    /**
     * Render dashboard cards
     */
    function renderDashboardCards(summary) {
        $('#totalEmployees').text(summary.total || 0);
        $('#activeEmployees').text(summary.active || 0);
        $('#inactiveEmployees').text(summary.inactive || 0);
        $('#totalDepartments').text(summary.departments || 0);
    }
    
    /**
     * Render department breakdown
     */
    function renderDepartmentBreakdown(data) {
        if (!data || data.length === 0) {
            $('#departmentBreakdown').html('<p class="text-muted text-center py-4">No data available</p>');
            return;
        }
        
        const maxCount = Math.max(...data.map(d => d.count), 0);
        const html = data.map(item => {
            const percentage = maxCount ? (item.count / maxCount * 100) : 0;
            const badgeClass = `badge-${item.department.toLowerCase()}`;
            
            return `
                <div class="dept-breakdown-item">
                    <span class="dept-name"><span class="badge ${badgeClass}">${item.department}</span></span>
                    <div class="progress-container">
                        <div class="progress">
                            <div class="progress-bar" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                    <span class="dept-count">${item.count}</span>
                </div>
            `;
        }).join('');
        
        $('#departmentBreakdown').html(html);
    }
    
    /**
     * Render recent employees
     */
    function renderRecentEmployees(employees) {
        if (!employees || employees.length === 0) {
            $('#recentEmployees').html('<p class="text-muted text-center py-4">No employees found</p>');
            return;
        }
        
        const html = employees.map(emp => {
            const statusClass = emp.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const deptClass = `badge-${emp.department?.toLowerCase() || 'other'}`;
            const initials = `${emp.firstName?.[0] || ''}${emp.lastName?.[0] || ''}`.toUpperCase();
            const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
            
            return `
                <div class="recent-employee-item">
                    <div class="recent-employee-avatar">${initials || '?'}</div>
                    <div class="recent-employee-info">
                        <div class="recent-employee-name">${fullName}</div>
                        <div class="recent-employee-meta">
                            <span class="badge ${deptClass}">${emp.department || 'N/A'}</span>
                            <span class="badge ${statusClass}">${emp.status || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        $('#recentEmployees').html(html);
    }
    
    /**
     * Refresh employee list with current filters
     */
    function refreshEmployeeList() {
        showTableLoading();
        
        // Simulate async loading
        setTimeout(() => {
            try {
                const employees = EmployeeService.getAll();
                renderEmployeeTable(employees);
            } catch (e) {
                console.error('Error refreshing employee list:', e);
                showToast('Error loading employees', 'error');
            }
        }, 500);
    }
    
    /**
     * Show table loading state
     */
    function showTableLoading() {
        $('#employeeTableBody').html(`
            <tr>
                <td colspan="9" class="text-center text-muted py-4">
                    <div class="spinner-border text-primary mb-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mb-0">Loading employees...</p>
                </td>
            </tr>
        `);
    }
    
    /**
     * Render employee table
     */
    function renderEmployeeTable(employees) {
        if (!employees || employees.length === 0) {
            $('#employeeTableBody').html(`
                <tr>
                    <td colspan="9" class="text-center text-muted py-4">
                        <i class="bi bi-inbox display-4 d-block mb-3"></i>
                        <p class="mb-0">No employees found</p>
                    </td>
                </tr>
            `);
            return;
        }
        
        const html = employees.map(emp => {
            const statusClass = emp.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const deptClass = `badge-${emp.department?.toLowerCase() || 'other'}`;
            const formattedSalary = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
            }).format(emp.salary || 0);
            const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
            const joinDate = emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : 'N/A';
            
            return `
                <tr>
                    <td class="fw-bold">${emp.id || 'N/A'}</td>
                    <td>${fullName}</td>
                    <td>${emp.email || 'N/A'}</td>
                    <td><span class="badge ${deptClass}">${emp.department || 'N/A'}</span></td>
                    <td>${emp.designation || 'N/A'}</td>
                    <td>${formattedSalary}</td>
                    <td>${joinDate}</td>
                    <td><span class="badge ${statusClass}">${emp.status || 'N/A'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-action btn-action-info view-btn" data-id="${emp.id}" title="View">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-action btn-action-warning edit-btn" data-id="${emp.id}" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-action btn-action-danger delete-btn" data-id="${emp.id}" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        $('#employeeTableBody').html(html);
    }
    
    /**
     * Populate department filter dropdown
     */
    function populateDepartmentFilter() {
        try {
            const departments = EmployeeService.getDepartments();
            let options = '<option value="all">All Departments</option>';
            
            departments.forEach(dept => {
                options += `<option value="${dept}">${dept}</option>`;
            });
            
            $('#departmentFilter').html(options);
        } catch (e) {
            console.error('Error populating departments:', e);
        }
    }
    
    /**
     * Show toast notification
     */
    function showToast(message, type = 'info') {
        const titleMap = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        
        $('#toastTitle').text(titleMap[type] || 'Notification');
        $('#toastMessage').text(message);
        
        const toast = $('#toast');
        toast.removeClass('bg-success bg-danger bg-warning bg-info text-white');
        
        switch(type) {
            case 'success':
                toast.addClass('bg-success text-white');
                break;
            case 'error':
                toast.addClass('bg-danger text-white');
                break;
            case 'warning':
                toast.addClass('bg-warning');
                break;
            case 'info':
                toast.addClass('bg-info text-white');
                break;
        }
        
        if (toastInstance) {
            toastInstance.show();
        }
    }
    
    // ==================== AUTHENTICATION EVENTS ====================
    
    // Show signup form
    $('#showSignup').on('click', function(e) {
        e.preventDefault();
        showSignup();
    });
    
    // Show login form
    $('#showLogin').on('click', function(e) {
        e.preventDefault();
        showLogin();
    });
    
    // Toggle password visibility
    $(document).on('click', '.toggle-password', function() {
        const input = $(this).closest('.input-group').find('input');
        const icon = $(this).find('i');
        
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
    
    // Signup form submission
    $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        $('#signupSpinner').removeClass('d-none');
        $('#signupBtn').prop('disabled', true);
        $('#signupError').addClass('d-none');
        
        const username = $('#signupUsername').val().trim();
        const password = $('#signupPassword').val();
        const confirmPassword = $('#confirmPassword').val();
        
        // Clear previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').text('');
        
        // Client-side validation
        const errors = ValidationService.validateSignupForm({ username, password, confirmPassword });
        
        if (Object.keys(errors).length > 0) {
            // Show validation errors
            Object.keys(errors).forEach(field => {
                const fieldId = field === 'confirmPassword' ? 'confirmPassword' : `signup${field.charAt(0).toUpperCase() + field.slice(1)}`;
                $(`#${fieldId}`).addClass('is-invalid');
                $(`#${fieldId}Error`).text(errors[field]);
            });
            
            $('#signupSpinner').addClass('d-none');
            $('#signupBtn').prop('disabled', false);
            return;
        }
        
        // Attempt signup
        setTimeout(() => {
            try {
                const result = AuthService.signup(username, password);
                
                if (result.success) {
                    showToast('Signup successful! Please login.', 'success');
                    showLogin();
                } else {
                    $('#signupErrorMessage').text(result.error || 'Signup failed');
                    $('#signupError').removeClass('d-none');
                }
            } catch (e) {
                console.error('Signup error:', e);
                $('#signupErrorMessage').text('An error occurred during signup');
                $('#signupError').removeClass('d-none');
            } finally {
                $('#signupSpinner').addClass('d-none');
                $('#signupBtn').prop('disabled', false);
            }
        }, 500);
    });
    
    // Login form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        $('#loginSpinner').removeClass('d-none');
        $('#loginBtn').prop('disabled', true);
        $('#loginError').addClass('d-none');
        
        const username = $('#loginUsername').val().trim();
        const password = $('#loginPassword').val();
        
        // Clear previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').text('');
        
        // Client-side validation
        const errors = ValidationService.validateLoginForm({ username, password });
        
        if (Object.keys(errors).length > 0) {
            // Show validation errors
            Object.keys(errors).forEach(field => {
                $(`#login${field.charAt(0).toUpperCase() + field.slice(1)}`).addClass('is-invalid');
                $(`#login${field.charAt(0).toUpperCase() + field.slice(1)}Error`).text(errors[field]);
            });
            
            $('#loginSpinner').addClass('d-none');
            $('#loginBtn').prop('disabled', false);
            return;
        }
        
        // Attempt login
        setTimeout(() => {
            try {
                const result = AuthService.login(username, password);
                
                if (result.success) {
                    showToast('Login successful!', 'success');
                    updateAuthUI();
                } else {
                    $('#loginErrorMessage').text(result.error || 'Invalid credentials');
                    $('#loginError').removeClass('d-none');
                    $('#loginPassword').val('');
                }
            } catch (e) {
                console.error('Login error:', e);
                $('#loginErrorMessage').text('An error occurred during login');
                $('#loginError').removeClass('d-none');
            } finally {
                $('#loginSpinner').addClass('d-none');
                $('#loginBtn').prop('disabled', false);
            }
        }, 500);
    });
    
    // Logout
    $('#logoutBtn').on('click', function() {
        AuthService.logout();
        showToast('Logged out successfully', 'info');
        updateAuthUI();
    });
    
    // ==================== NAVIGATION EVENTS ====================
    
    $('#navDashboard').on('click', function(e) {
        e.preventDefault();
        setActiveNav('dashboard');
        refreshDashboard();
    });
    
    $('#navEmployees').on('click', function(e) {
        e.preventDefault();
        setActiveNav('employees');
    });
    
    // ==================== FILTER EVENTS ====================
    
    // Real-time search with debounce
    let searchTimeout;
    $('#searchInput').on('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = $(this).val();
        
        searchTimeout = setTimeout(() => {
            try {
                EmployeeService.setFilters({ search: searchTerm });
                refreshEmployeeList();
            } catch (e) {
                console.error('Error applying search filter:', e);
            }
        }, 300);
    });
    
    // Department filter
    $('#departmentFilter').on('change', function() {
        try {
            EmployeeService.setFilters({ department: $(this).val() });
            refreshEmployeeList();
        } catch (e) {
            console.error('Error applying department filter:', e);
        }
    });
    
    // Status filter (radio buttons)
    $('input[name="statusFilter"]').on('change', function() {
        try {
            EmployeeService.setFilters({ status: $(this).val() });
            refreshEmployeeList();
        } catch (e) {
            console.error('Error applying status filter:', e);
        }
    });
    
    // Sort by
    $('#sortBy').on('change', function() {
        try {
            EmployeeService.setFilters({ sort: $(this).val() });
            refreshEmployeeList();
        } catch (e) {
            console.error('Error applying sort:', e);
        }
    });
    
    // ==================== CRUD EVENTS ====================
    
    // Add employee button
    $('#addEmployeeBtn').on('click', function() {
        $('#modalTitle').html('<i class="bi bi-person-plus-fill me-2"></i>Add Employee');
        $('#employeeForm')[0].reset();
        $('#employeeId').val('');
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
        employeeModal?.show();
    });
    
    // Save employee (Add/Edit) - FIXED VERSION
    $('#saveEmployeeBtn').on('click', function() {
        const id = $('#employeeId').val();
        const formData = {
            firstName: $('#firstName').val()?.trim(),
            lastName: $('#lastName').val()?.trim(),
            email: $('#email').val()?.trim(),
            phone: $('#phone').val()?.trim(),
            department: $('#department').val(),
            designation: $('#designation').val()?.trim(),
            salary: $('#salary').val(),
            joinDate: $('#joinDate').val(),
            status: $('#status').val()
        };
        
        // Log for debugging
        console.log('Saving employee with ID:', id);
        console.log('Form data:', formData);
        
        // Validate - pass the ID for updates to exclude current employee from duplicate email check
        const errors = ValidationService.validateEmployeeForm(formData, id || null);
        
        if (Object.keys(errors).length > 0) {
            console.log('Validation errors:', errors);
            // Show inline errors
            $('.invalid-feedback').text('');
            $('.is-invalid').removeClass('is-invalid');
            
            Object.keys(errors).forEach(field => {
                $(`#${field}`).addClass('is-invalid');
                $(`#${field}Error`).text(errors[field]);
            });
            return;
        }
        
        try {
            let result;
            if (id) {
                // Update - pass the ID to update
                console.log('Updating employee with ID:', id);
                result = EmployeeService.update(parseInt(id), formData);
                if (result) {
                    showToast('Employee updated successfully', 'success');
                } else {
                    showToast('Failed to update employee', 'error');
                }
            } else {
                // Add
                console.log('Adding new employee');
                result = EmployeeService.add(formData);
                showToast('Employee added successfully', 'success');
            }
            
            if (result) {
                // Close modal and refresh
                employeeModal?.hide();
                refreshEmployeeList();
                refreshDashboard();
                populateDepartmentFilter();
                
                // Clear form
                $('#employeeForm')[0].reset();
                $('#employeeId').val('');
                $('.invalid-feedback').text('');
                $('.is-invalid').removeClass('is-invalid');
            }
        } catch (e) {
            console.error('Error saving employee:', e);
            showToast('Error saving employee', 'error');
        }
    });
    
    // View employee (delegation)
    $('#employeeTableBody').on('click', '.view-btn', function() {
        const id = $(this).data('id');
        
        try {
            const employee = EmployeeService.getById(id);
            
            if (employee) {
                $('#viewFirstName').text(employee.firstName || 'N/A');
                $('#viewLastName').text(employee.lastName || 'N/A');
                $('#viewEmail').text(employee.email || 'N/A');
                $('#viewPhone').text(employee.phone || 'N/A');
                $('#viewDepartment').text(employee.department || 'N/A');
                $('#viewDesignation').text(employee.designation || 'N/A');
                
                const formattedSalary = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0
                }).format(employee.salary || 0);
                $('#viewSalary').text(formattedSalary);
                
                const joinDate = employee.joinDate ? new Date(employee.joinDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) : 'N/A';
                $('#viewJoinDate').text(joinDate);
                
                $('#viewStatus').text(employee.status || 'N/A');
                
                viewModal?.show();
            }
        } catch (e) {
            console.error('Error viewing employee:', e);
            showToast('Error loading employee details', 'error');
        }
    });
    
    // Edit employee (delegation)
    $('#employeeTableBody').on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        
        try {
            const employee = EmployeeService.getById(id);
            
            if (employee) {
                $('#modalTitle').html('<i class="bi bi-pencil-fill me-2"></i>Edit Employee');
                $('#employeeId').val(employee.id);
                $('#firstName').val(employee.firstName || '');
                $('#lastName').val(employee.lastName || '');
                $('#email').val(employee.email || '');
                $('#phone').val(employee.phone || '');
                $('#department').val(employee.department || '');
                $('#designation').val(employee.designation || '');
                $('#salary').val(employee.salary || '');
                $('#joinDate').val(employee.joinDate || '');
                $('#status').val(employee.status || 'Active');
                
                $('.invalid-feedback').text('');
                $('.is-invalid').removeClass('is-invalid');
                
                employeeModal?.show();
            }
        } catch (e) {
            console.error('Error editing employee:', e);
            showToast('Error loading employee data', 'error');
        }
    });
    
    // Delete employee (delegation)
    $('#employeeTableBody').on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        
        try {
            const employee = EmployeeService.getById(id);
            
            if (employee) {
                const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'this employee';
                $('#deleteEmployeeName').text(fullName);
                currentDeleteId = id;
                deleteModal?.show();
            }
        } catch (e) {
            console.error('Error preparing delete:', e);
            showToast('Error loading employee data', 'error');
        }
    });
    
    // Confirm delete
    $('#confirmDeleteBtn').on('click', function() {
        if (!currentDeleteId) {
            deleteModal?.hide();
            return;
        }
        
        try {
            const removed = EmployeeService.remove(currentDeleteId);
            
            if (removed) {
                showToast('Employee deleted successfully', 'success');
                refreshEmployeeList();
                refreshDashboard();
                populateDepartmentFilter();
            }
        } catch (e) {
            console.error('Error deleting employee:', e);
            showToast('Error deleting employee', 'error');
        } finally {
            currentDeleteId = null;
            deleteModal?.hide();
        }
    });
    
    // Clear form when modal is closed
    $('#employeeModal').on('hidden.bs.modal', function() {
        $('#employeeForm')[0]?.reset();
        $('#employeeId').val('');
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
    });
});