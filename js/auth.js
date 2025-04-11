/* auth.js */
// Get current logged in user
function getCurrentUser() {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

// Register a new user
function register(name, email, password, role) {
    const db = getDB();
    
    // Check if email already exists
    if (db.users.some(user => user.email === email)) {
        return {
            success: false,
            message: 'Email already registered'
        };
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name: name,
        email: email,
        password: password, // In a real app, this would be hashed
        role: role,
        createdAt: Date.now()
    };
    
    // Add to database
    db.users.push(newUser);
    saveDB(db);
    
    return {
        success: true,
        user: {...newUser, password: undefined} // Don't return password
    };
}

// Login user
function login(email, password) {
    const db = getDB();
    
    // Find user
    const user = db.users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }
    
    // Store in session
    const userCopy = {...user};
    delete userCopy.password; // Don't store password in session
    sessionStorage.setItem('currentUser', JSON.stringify(userCopy));
    
    return {
        success: true,
        user: userCopy
    };
}

// Logout user
function logout() {
    sessionStorage.removeItem('currentUser');
}