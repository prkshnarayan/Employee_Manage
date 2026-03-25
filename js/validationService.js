/**
 * validationService.js - Owns all client-side form validation logic
 */

const ValidationService = {
    /**
     * Validate employee form data
     * @param {Object} data - Form data
     * @param {number} excludeId - Employee ID to exclude for duplicate email check (for updates)
     * @returns {Object} Validation errors
     */
    validateEmployeeForm(data, excludeId = null) {
        const errors = {};
        
        // Required fields
        if (!data.firstName?.trim()) {
            errors.firstName = 'First name is required';
        }
        
        if (!data.lastName?.trim()) {
            errors.lastName = 'Last name is required';
        }
        
        if (!data.email?.trim()) {
            errors.email = 'Email is required';
        } else {
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errors.email = 'Invalid email format';
            } else {
                // Check for duplicate email only if it's a new employee or email has changed
                // Get the current employee data if this is an update
                let currentEmail = null;
                if (excludeId) {
                    const currentEmployee = EmployeeService.getById(parseInt(excludeId));
                    if (currentEmployee) {
                        currentEmail = currentEmployee.email;
                    }
                }
                
                // Only check for duplicates if this is a new employee OR the email has changed
                if (!excludeId || (currentEmail && currentEmail !== data.email)) {
                    const emailExists = EmployeeService.emailExists(data.email, excludeId);
                    if (emailExists) {
                        errors.email = 'Email already exists';
                    }
                }
            }
        }
        
        // Phone validation
        if (!data.phone?.trim()) {
            errors.phone = 'Phone number is required';
        } else {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(data.phone)) {
                errors.phone = 'Phone must be 10 digits';
            }
        }
        
        if (!data.department) {
            errors.department = 'Department is required';
        }
        
        if (!data.designation?.trim()) {
            errors.designation = 'Designation is required';
        }
        
        // Salary validation
        if (!data.salary) {
            errors.salary = 'Salary is required';
        } else {
            const salary = Number(data.salary);
            if (isNaN(salary) || salary <= 0) {
                errors.salary = 'Salary must be a positive number';
            }
        }
        
        if (!data.joinDate) {
            errors.joinDate = 'Join date is required';
        }
        
        return errors;
    },

    /**
     * Validate signup form
     * @param {Object} data - Form data
     * @returns {Object} Validation errors
     */
    validateSignupForm({ username, password, confirmPassword }) {
        const errors = {};
        
        if (!username?.trim()) {
            errors.username = 'Username is required';
        }
        
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        return errors;
    },

    /**
     * Validate login form
     * @param {Object} data - Form data
     * @returns {Object} Validation errors
     */
    validateLoginForm({ username, password }) {
        const errors = {};
        
        if (!username?.trim()) {
            errors.username = 'Username is required';
        }
        
        if (!password) {
            errors.password = 'Password is required';
        }
        
        return errors;
    }
};