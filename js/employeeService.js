/**
 * employeeService.js - Owns all employee business logic
 * Uses storageService for data access
 */

// Current filter/sort state
let currentSearch = '';
let currentDepartment = 'all';
let currentStatus = 'all';
let currentSort = 'name';

const EmployeeService = {
    /**
     * Get all employees (with current filters and sort applied)
     * @returns {Array} Filtered and sorted employees
     */
    getAll() {
        return this.applyFilters(currentSearch, currentDepartment, currentStatus, currentSort);
    },

    /**
     * Get employee by ID
     * @param {number} id - Employee ID
     * @returns {Object|null} Employee object or null
     */
    getById(id) {
        return StorageService.getById(id);
    },

    /**
     * Add new employee
     * @param {Object} data - Employee data
     * @returns {Object} Added employee
     */
    add(data) {
        return StorageService.add(data);
    },

    /**
     * Update employee
     * @param {number} id - Employee ID
     * @param {Object} data - Updated data
     * @returns {Object|null} Updated employee or null
     */
    update(id, data) {
        return StorageService.update(id, data);
    },

    /**
     * Remove employee
     * @param {number} id - Employee ID
     * @returns {boolean} True if removed
     */
    remove(id) {
        return StorageService.remove(id);
    },

    /**
     * Search employees by name or email
     * @param {string} query - Search query
     * @returns {Array} Filtered employees
     */
    search(query) {
        if (!query) return StorageService.getAll();
        
        const lowerQuery = query.toLowerCase();
        return StorageService.getAll().filter(emp => 
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery)
        );
    },

    /**
     * Filter by department
     * @param {string} dept - Department name or 'all'
     * @returns {Array} Filtered employees
     */
    filterByDepartment(dept) {
        if (dept === 'all') return StorageService.getAll();
        return StorageService.getAll().filter(emp => emp.department === dept);
    },

    /**
     * Filter by status
     * @param {string} status - 'Active', 'Inactive', or 'all'
     * @returns {Array} Filtered employees
     */
    filterByStatus(status) {
        if (status === 'all') return StorageService.getAll();
        return StorageService.getAll().filter(emp => emp.status === status);
    },

    /**
     * Apply all filters (AND logic)
     * @param {string} search - Search query
     * @param {string} dept - Department filter
     * @param {string} status - Status filter
     * @param {string} sort - Sort option
     * @returns {Array} Filtered and sorted employees
     */
    applyFilters(search = currentSearch, dept = currentDepartment, status = currentStatus, sort = currentSort) {
        let results = StorageService.getAll();
        
        // Apply search filter
        if (search) {
            const lowerSearch = search.toLowerCase();
            results = results.filter(emp => 
                `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(lowerSearch) ||
                emp.email.toLowerCase().includes(lowerSearch)
            );
        }
        
        // Apply department filter
        if (dept !== 'all') {
            results = results.filter(emp => emp.department === dept);
        }
        
        // Apply status filter
        if (status !== 'all') {
            results = results.filter(emp => emp.status === status);
        }
        
        // Apply sorting
        return this.sortBy(results, sort);
    },

    /**
     * Sort employees
     * @param {Array} employees - Employees array
     * @param {string} sortBy - Sort option
     * @returns {Array} Sorted employees
     */
    sortBy(employees, sortBy) {
        const sorted = [...employees];
        
        switch (sortBy) {
            case 'name':
                sorted.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
                break;
            case 'nameDesc':
                sorted.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
                break;
            case 'salaryAsc':
                sorted.sort((a, b) => a.salary - b.salary);
                break;
            case 'salaryDesc':
                sorted.sort((a, b) => b.salary - a.salary);
                break;
            case 'dateAsc':
                sorted.sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));
                break;
            case 'dateDesc':
                sorted.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
                break;
            default:
                // Default sort by name
                sorted.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
        }
        
        return sorted;
    },

    /**
     * Update filter state
     * @param {Object} filters - Filter updates
     */
    setFilters({ search, department, status, sort } = {}) {
        if (search !== undefined) currentSearch = search;
        if (department !== undefined) currentDepartment = department;
        if (status !== undefined) currentStatus = status;
        if (sort !== undefined) currentSort = sort;
    },

    /**
     * Get current filter state
     * @returns {Object} Current filters
     */
    getFilters() {
        return {
            search: currentSearch,
            department: currentDepartment,
            status: currentStatus,
            sort: currentSort
        };
    },

    /**
     * Get unique departments
     * @returns {Array} Unique department names
     */
    getDepartments() {
        const employees = StorageService.getAll();
        return [...new Set(employees.map(emp => emp.department))].sort();
    },

    /**
     * Check if email exists (for validation)
     * @param {string} email - Email to check
     * @param {number} excludeId - Employee ID to exclude (for updates)
     * @returns {boolean} True if email exists
     */
    emailExists(email, excludeId = null) {
        const employees = StorageService.getAll();
        return employees.some(emp => 
            emp.email.toLowerCase() === email.toLowerCase() && 
            emp.id !== excludeId
        );
    }
};