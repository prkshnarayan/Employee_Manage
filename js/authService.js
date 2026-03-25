/**
 * authService.js - Owns all authentication logic
 * Uses storageService for data access
 */

// In-memory session state
let currentUser = null;

const AuthService = {
    /**
     * Sign up a new admin
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Object} Result with success flag and error message
     */
    signup(username, password) {
        // Validation
        if (!username || !password) {
            return { success: false, error: 'Username and password are required' };
        }
        
        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        const admin = StorageService.getAdmin();
        if (admin.username === username) {
            return { success: false, error: 'Username already exists' };
        }
        
        // Store new credentials
        StorageService.updateAdmin(username, password);
        return { success: true };
    },

    /**
     * Login admin
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Object} Result with success flag and error message
     */
    login(username, password) {
        if (!username || !password) {
            return { success: false, error: 'Username and password are required' };
        }
        
        const admin = StorageService.getAdmin();
        if (admin.username === username && admin.password === password) {
            currentUser = { username };
            return { success: true };
        }
        
        return { success: false, error: 'Invalid credentials' };
    },

    /**
     * Logout current user
     */
    logout() {
        currentUser = null;
    },

    /**
     * Check if user is logged in
     * @returns {boolean} True if user is logged in
     */
    isLoggedIn() {
        return currentUser !== null;
    },

    /**
     * Get current user
     * @returns {Object|null} Current user or null
     */
    getCurrentUser() {
        return currentUser ? { ...currentUser } : null;
    }
};