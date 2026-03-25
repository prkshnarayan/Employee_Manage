/**
 * dashboardService.js - Owns all dashboard computation logic
 * Uses employeeService for data
 */

const DashboardService = {
    /**
     * Get summary statistics
     * @returns {Object} Summary data
     */
    getSummary() {
        const employees = EmployeeService.getAll();
        
        return {
            total: employees.length,
            active: employees.filter(emp => emp.status === 'Active').length,
            inactive: employees.filter(emp => emp.status === 'Inactive').length,
            departments: new Set(employees.map(emp => emp.department)).size
        };
    },

    /**
     * Get department breakdown
     * @returns {Array} Department counts
     */
    getDepartmentBreakdown() {
        const employees = EmployeeService.getAll();
        const departments = {};
        
        employees.forEach(emp => {
            if (!departments[emp.department]) {
                departments[emp.department] = 0;
            }
            departments[emp.department]++;
        });
        
        // Convert to array and sort by count (descending)
        return Object.entries(departments)
            .map(([department, count]) => ({ department, count }))
            .sort((a, b) => b.count - a.count);
    },

    /**
     * Get recent employees (last n added)
     * @param {number} n - Number of employees to return
     * @returns {Array} Recent employees (highest IDs)
     */
    getRecentEmployees(n = 5) {
        const employees = EmployeeService.getAll();
        
        // Sort by ID descending (assuming higher ID = newer)
        return [...employees]
            .sort((a, b) => b.id - a.id)
            .slice(0, n)
            .map(emp => ({
                ...emp,
                fullName: `${emp.firstName} ${emp.lastName}`
            }));
    }
};