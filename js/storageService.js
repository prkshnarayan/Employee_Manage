/**
 * storageService.js - Single interface for data access
 * No other module reads or writes the employee array directly
 */

// Private in-memory store (cloned from data.js to prevent direct mutation)
let employees = [...EMPLOYEES];
let adminCredentials = { ...INITIAL_ADMIN };

const StorageService = {
    /**
     * Get all employees
     * @returns {Array} Copy of employees array
     */
    getAll() {
        return [...employees];
    },

    /**
     * Get employee by ID
     * @param {number} id - Employee ID
     * @returns {Object|null} Employee object or null if not found
     */
    getById(id) {
        return employees.find(emp => emp.id === id) || null;
    },

    /**
     * Add new employee
     * @param {Object} employee - Employee object (without id)
     * @returns {Object} Added employee with generated id
     */
    add(employee) {
        const newEmployee = {
            ...employee,
            id: this.nextId()
        };
        employees.push(newEmployee);
        return { ...newEmployee };
    },

    /**
     * Update employee
     * @param {number} id - Employee ID
     * @param {Object} data - Updated employee data
     * @returns {Object|null} Updated employee or null if not found
     */
    update(id, data) {
        const index = employees.findIndex(emp => emp.id === id);
        if (index === -1) return null;
        
        employees[index] = { ...employees[index], ...data, id };
        return { ...employees[index] };
    },

    /**
     * Remove employee
     * @param {number} id - Employee ID
     * @returns {boolean} True if employee was removed
     */
    remove(id) {
        const initialLength = employees.length;
        employees = employees.filter(emp => emp.id !== id);
        return employees.length !== initialLength;
    },

    /**
     * Get next available ID
     * @returns {number} Next ID
     */
    nextId() {
        return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    },

    /**
     * Get admin credentials
     * @returns {Object} Admin credentials
     */
    getAdmin() {
        return { ...adminCredentials };
    },

    /**
     * Update admin credentials (for signup)
     * @param {string} username - New username
     * @param {string} password - New password
     */
    updateAdmin(username, password) {
        adminCredentials = { username, password };
    },

    /**
     * Reset store to initial data (useful for testing)
     */
    reset() {
        employees = [...EMPLOYEES];
        adminCredentials = { ...INITIAL_ADMIN };
    }
};