import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from the Authorization header
    if (!token) {
        res.sendStatus(401); // Unauthorized if token is not present
        return; // Ensure to exit the function here
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.sendStatus(403); // Forbidden if token is invalid
            return; // Ensure to exit the function here
        }
        req.user = user; // Attach the user payload to the request object
        next(); // Call the next middleware or route handler
    });
};
