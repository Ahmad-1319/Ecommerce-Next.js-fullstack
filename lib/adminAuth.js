import jwt from 'jsonwebtoken';

export async function requireAdmin(request) {
  try {
    const token = request.headers.get('auth-token');
    if (!token) {
      return { status: 401, message: 'No token provided' };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return { status: 403, message: 'Admin access required' };
    }
    return { status: 200, user: decoded };
  } catch (err) {
    return { status: 401, message: 'Invalid token' , err };
  }
} 