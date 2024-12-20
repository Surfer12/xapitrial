const XAIApi = require('../../XAIAPI');
const AIDevAssistant = require('../../practical_examples').AIDevAssistant;
const fs = require('fs').promises;
const path = require('path');

async function improveUserManagementSystem() {
    // Initialize our AI assistant
    const assistant = new AIDevAssistant('your-api-key');

    // Read the current code
    const sourceCode = await fs.readFile(
        path.join(__dirname, 'src', 'userManagement.js'),
        'utf-8'
    );

    console.log('Starting code improvement process...\n');

    // Step 1: Generate Documentation
    console.log('Step 1: Generating Documentation');
    const documentation = await assistant.generateDocumentation(sourceCode);
    console.log('Generated Documentation:');
    console.log(documentation);

    // Step 2: Find Potential Bugs
    console.log('\nStep 2: Finding Potential Bugs');
    const bugs = await assistant.findBugs(sourceCode);
    console.log('Potential Issues Found:');
    console.log(bugs);

    // Step 3: Get Refactoring Suggestions
    console.log('\nStep 3: Getting Refactoring Suggestions');
    const refactoring = await assistant.suggestRefactoring(sourceCode);
    console.log('Refactoring Suggestions:');
    console.log(refactoring);

    // Step 4: Generate Test Cases
    console.log('\nStep 4: Generating Test Cases');
    const tests = await assistant.generateTests(sourceCode);
    console.log('Generated Test Cases:');
    console.log(tests);

    // Create improved version of the code
    const improvedCode = `
    /**
     * Improved User Management System
     * Generated Documentation:
     * ${documentation.split('\n').map(line => ` * ${line}`).join('\n')}
     */

    class UserManagement {
        constructor() {
            this.validateEmail = this.validateEmail.bind(this);
        }

        /**
         * Creates a new user with validated data
         * @param {Object} userData - User information
         * @param {string} userData.name - User's full name
         * @param {string} userData.email - User's email address
         * @param {number} userData.age - User's age
         * @param {string} [userData.role='user'] - User's role in the system
         * @returns {Object|null} Created user object or null if validation fails
         * @throws {Error} If required fields are missing
         */
        createUser(userData) {
            // Validate required fields
            if (!userData?.name || !userData?.email) {
                throw new Error('Name and email are required');
            }

            // Validate email format
            if (!this.validateEmail(userData.email)) {
                throw new Error('Invalid email format');
            }

            const user = {
                name: userData.name.trim(),
                email: userData.email.toLowerCase(),
                age: Number(userData.age),
                role: userData.role || 'user',
                createdAt: new Date().toISOString()
            };

            // Store user in database
            const success = this.saveUserToDb(user);
            return success ? user : null;
        }

        /**
         * Validates email format using regex
         * @param {string} email - Email address to validate
         * @returns {boolean} True if email format is valid
         */
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Saves user data to the database
         * @param {Object} user - User object to save
         * @returns {boolean} True if save was successful
         * @private
         */
        saveUserToDb(user) {
            try {
                // Mock database save with validation
                if (!user?.name || !user?.email) {
                    console.error('Missing required fields');
                    return false;
                }
                console.log('Saving user to database:', user);
                return true;
            } catch (error) {
                console.error('Database save error:', error);
                return false;
            }
        }

        /**
         * Retrieves a user by their ID
         * @param {string|number} id - User ID to look up
         * @returns {Promise<Object|null>} User object or null if not found
         */
        async getUserById(id) {
            if (!id) {
                throw new Error('User ID is required');
            }

            try {
                // Mock async database fetch
                const user = await Promise.resolve({
                    name: 'Test User',
                    email: 'test@example.com',
                    age: 25,
                    role: 'user',
                    createdAt: new Date().toISOString()
                });
                return user;
            } catch (error) {
                console.error('Error fetching user:', error);
                return null;
            }
        }
    }

    module.exports = new UserManagement();
    `;

    // Save the improved code
    const improvedFilePath = path.join(__dirname, 'src', 'userManagement.improved.js');
    await fs.writeFile(improvedFilePath, improvedCode);
    console.log(`\nImproved code has been saved to: ${improvedFilePath}`);

    // Generate test file
    const testCode = `
    const UserManagement = require('./userManagement.improved');
    const { expect } = require('chai');

    describe('UserManagement', () => {
        ${tests}
    });
    `;

    const testFilePath = path.join(__dirname, 'test', 'userManagement.test.js');
    await fs.writeFile(testFilePath, testCode);
    console.log(`Test file has been saved to: ${testFilePath}`);
}

// Run the improvement process
improveUserManagementSystem().catch(console.error);
