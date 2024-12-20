// Basic user management system with some intentional issues
function createUser(userData) {
    var user = {};
    user.name = userData.name;
    user.email = userData.email;
    user.age = userData.age;
    if (userData.role != null) user.role = userData.role;

    // Store user in database
    var success = saveUserToDb(user);
    return success ? user : null;
}

function validateUserEmail(email) {
    return email.indexOf('@') > -1;
}

function saveUserToDb(user) {
    // Mock database save
    if (user.name && user.email) {
        console.log('Saving user to database:', user);
        return true;
    }
    return false;
}

function getUserById(id) {
    // Mock database fetch
    if (!id) return null;
    return {
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        role: 'user'
    };
}

module.exports = {
    createUser,
    validateUserEmail,
    getUserById
};
