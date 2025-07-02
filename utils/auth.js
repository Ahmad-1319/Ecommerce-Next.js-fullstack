import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    // Remove 'Bearer ' if present
    const cleanToken = token.replace('Bearer ', '');
    
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const getUserIdFromToken = (request) => {
  try {
    const token = request.headers.get('auth-token');
    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}; 