/* storage.js */
// Initialize database structure
const DB_STRUCTURE = {
    users: [],
    posts: [],
    comments: [],
    likes: [],
    spotlight: []
};

// Get database from localStorage or create new one
function getDB() {
    const storedDB = localStorage.getItem('talentShowcaseDB');
    
    if (storedDB) {
        return JSON.parse(storedDB);
    } else {
        // Initialize with admin user if DB doesn't exist
        const initialDB = {...DB_STRUCTURE};
        
        // Create admin user
        initialDB.users.push({
            id: generateId(),
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // In a real app, this would be hashed
            role: 'admin',
            createdAt: Date.now()
        });
        
        saveDB(initialDB);
        return initialDB;
    }
}

// Save database to localStorage
function saveDB(db) {
    localStorage.setItem('talentShowcaseDB', JSON.stringify(db));
}

// Generate a unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}