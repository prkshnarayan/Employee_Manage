/**
 * uiService.js - Owns all DOM rendering and UI feedback
 * Never contains business logic
 */

const UIService = {
    /**
     * Show/hide sections based on authentication
     * @param {boolean} isLoggedIn - Whether user is logged in
     */
    toggleAuthSections(isLoggedIn) {
        if (isLoggedIn) {
            $('#loginSection, #signupSection').hide();
            $('#appSection').show();
        } else {
            $('#loginSection, #signupSection').show();
            $('#appSection').hide();
        }
    },

    /**
     * Show login section, hide signup
     */
    showLogin() {
        $('#signupSection').hide();
        $('#loginSection').show();
        this.clearAuthForms();
    },

    /**
     * Show signup section, hide login
     */
    showSignup() {
        $('#loginSection').hide();
        $('#signupSection').show();
        this.clearAuthForms();
    },

    /**
     * Clear authentication forms
     */
    clearAuthForms() {
        $('#loginForm')[0]?.reset();
        $('#signupForm')[0]?.reset();
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
        $('#loginError').addClass('d-none');
    },

    /**
     * Switch view (dashboard/employee list)
     * @param {string} view - 'dashboard' or 'employees'
     */
    switchView(view) {
        if (view === 'dashboard') {
            $('#dashboardView').show();
            $('#employeeListView').hide();
            $('#navDashboard').addClass('active');
            $('#navEmployees').removeClass('active');
        } else {
            $('#dashboardView').hide();
            $('#employeeListView').show();
            $('#navEmployees').addClass('active');
            $('#navDashboard').removeClass('active');
        }
    },

    /**
     * Render dashboard cards
     * @param {Object} summary - Summary data
     */
    renderDashboardCards(summary) {
        $('#totalEmployees').text(summary.total);
        $('#activeEmployees').text(summary.active);
        $('#inactiveEmployees').text(summary.inactive);
        $('#totalDepartments').text(summary.departments);
    },

    /**
     * Render department breakdown
     * @param {Array} data - Department breakdown data
     */
    renderDepartmentBreakdown(data) {
        const maxCount = Math.max(...data.map(d => d.count), 0);
        const html = data.map(item => {
            const percentage = maxCount ? (item.count / maxCount * 100) : 0;
            const badgeClass = `badge-${item.department.toLowerCase()}`;
            
            return `
                <div class="mb-2">
                    <div class="d-flex justify-content-between mb-1">
                        <span><span class="badge ${badgeClass}">${item.department}</span></span>
                        <span>${item.count}</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-primary" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');
        
        $('#departmentBreakdown').html(html || '<p class="text-muted">No data available</p>');
    },

    /**
     * Render recent employees
     * @param {Array} employees - Recent employees
     */
    renderRecentEmployees(employees) {
        if (employees.length === 0) {
            $('#recentEmployees').html('<p class="text-muted">No employees found</p>');
            return;
        }
        
        const html = employees.map(emp => {
            const statusClass = emp.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const deptClass = `badge-${emp.department.toLowerCase()}`;
            const initials = `${emp.firstName[0]}${emp.lastName[0]}`;
            
            return `
                <div class="recent-employee-item">
                    <div class="recent-employee-avatar">${initials}</div>
                    <div style="flex: 1;">
                        <div><strong>${emp.fullName}</strong></div>
                        <div>
                            <span class="badge ${deptClass}">${emp.department}</span>
                            <span class="badge ${statusClass}">${emp.status}</span>
                        </div>
                        <small class="text-muted">${emp.designation}</small>
                    </div>
                </div>
            `;
        }).join('');
        
        $('#recentEmployees').html(html);
    },

    /**
     * Render employee table
     * @param {Array} employees - Employees to render
     */
    renderEmployeeTable(employees) {
        if (employees.length === 0) {
            $('#employeeTableBody').html(`
                <tr>
                    <td colspan="9" class="text-center text-muted">No employees found</td>
                </tr>
            `);
            return;
        }
        
        const html = employees.map(emp => {
            const statusClass = emp.status === 'Active' ? 'badge-active' : 'badge-inactive';
            const deptClass = `badge-${emp.department.toLowerCase()}`;
            const formattedSalary = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
            }).format(emp.salary);
            
            return `
                <tr>
                    <td>${emp.id}</td>
                    <td>${emp.firstName} ${emp.lastName}</td>
                    <td>${emp.email}</td>
                    <td><span class="badge ${deptClass}">${emp.department}</span></td>
                    <td>${emp.designation}</td>
                    <td>${formattedSalary}</td>
                    <td>${new Date(emp.joinDate).toLocaleDateString('en-IN')}</td>
                    <td><span class="badge ${statusClass}">${emp.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-info view-btn" data-id="${emp.id}">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning edit-btn" data-id="${emp.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${emp.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        $('#employeeTableBody').html(html);
    },

    /**
     * Populate department filter dropdown
     * @param {Array} departments - Department names
     */
    populateDepartmentFilter(departments) {
        const options = ['<option value="all">All Departments</option>'];
        departments.forEach(dept => {
            options.push(`<option value="${dept}">${dept}</option>`);
        });
        $('#departmentFilter').html(options.join(''));
    },

    /**
     * Show modal
     * @param {string} modalId - Modal ID
     */
    showModal(modalId) {
        $(modalId).modal('show');
    },

    /**
     * Hide modal
     * @param {string} modalId - Modal ID
     */
    hideModal(modalId) {
        $(modalId).modal('hide');
    },

    /**
     * Populate employee form for editing
     * @param {Object} employee - Employee data
     */
    populateForm(employee) {
        $('#employeeId').val(employee.id);
        $('#firstName').val(employee.firstName);
        $('#lastName').val(employee.lastName);
        $('#email').val(employee.email);
        $('#phone').val(employee.phone);
        $('#department').val(employee.department);
        $('#designation').val(employee.designation);
        $('#salary').val(employee.salary);
        $('#joinDate').val(employee.joinDate);
        $('#status').val(employee.status);
    },

    /**
     * Clear employee form
     */
    clearForm() {
        $('#employeeForm')[0].reset();
        $('#employeeId').val('');
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
    },

    /**
     * Show inline validation errors
     * @param {Object} errors - Validation errors
     */
    showInlineErrors(errors) {
        // Clear previous errors
        $('.invalid-feedback').text('');
        $('.is-invalid').removeClass('is-invalid');
        
        // Show new errors
        Object.keys(errors).forEach(field => {
            $(`#${field}`).addClass('is-invalid');
            $(`#${field}Error`).text(errors[field]);
        });
    },

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {string} type - 'success', 'error', 'warning', 'info'
     */
    showToast(message, type = 'info') {
        const toast = $('#toast');
        const titleMap = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        
        $('#toastTitle').text(titleMap[type] || 'Notification');
        $('#toastMessage').text(message);
        
        toast.removeClass('bg-success bg-danger bg-warning bg-info');
        if (type === 'success') toast.addClass('bg-success text-white');
        else if (type === 'error') toast.addClass('bg-danger text-white');
        else if (type === 'warning') toast.addClass('bg-warning');
        else if (type === 'info') toast.addClass('bg-info text-white');
        
        const bsToast = new bootstrap.Toast(toast[0]);
        bsToast.show();
    },

    /**
     * Show loading spinner in table
     */
    showTableLoading() {
        $('#employeeTableBody').html(`
            <tr>
                <td colspan="9" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        `);
    },

    /**
     * Show loading spinners in dashboard
     */
    showDashboardLoading() {
        $('#departmentBreakdown').html(`
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
        
        $('#recentEmployees').html(`
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
    },

    /**
     * Populate view modal with employee data
     * @param {Object} employee - Employee data
     */
    populateViewModal(employee) {
        $('#viewFirstName').text(employee.firstName);
        $('#viewLastName').text(employee.lastName);
        $('#viewEmail').text(employee.email);
        $('#viewPhone').text(employee.phone);
        $('#viewDepartment').text(employee.department);
        $('#viewDesignation').text(employee.designation);
        $('#viewSalary').text(new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(employee.salary));
        $('#viewJoinDate').text(new Date(employee.joinDate).toLocaleDateString('en-IN'));
        $('#viewStatus').text(employee.status);
    },

    /**
     * Set delete modal employee name
     * @param {string} name - Employee name
     * @param {number} id - Employee ID
     */
    setDeleteModal(name, id) {
        $('#deleteEmployeeName').text(name);
        $('#confirmDeleteBtn').data('id', id);
    }
};