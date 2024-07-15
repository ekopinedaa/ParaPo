const Users = require('../model/users_model')

const UserController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const newUser = new Users(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Read all users
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await Users.findOne({ userid: req.params.userid });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userid } = req.params;
            const updatedUser = await Users.findOneAndUpdate(
                { userid },
                { $set: req.body },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userid } = req.params;
            const deletedUser = await Users.findOneAndDelete({ userid });
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }
    
            const user = await Users.findOne({ username, password });
    
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
    
            console.log("Login successful");
            res.status(200).json({ success: true, userData: user }); // Send back user data
        } catch (error) {
            console.error('Error logging in:', error.message);
            res.status(500).send('Server Error');
        }
    },

    
};

module.exports = UserController;