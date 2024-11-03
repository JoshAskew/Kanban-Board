import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const login = async (req, res) => {
    console.log('Login attempt:', req.body);
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body; // Get username and password from request body
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Generate and return a JWT token
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token }); // Return the token as JSON
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
