const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthenticated user' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = adminMiddleware;