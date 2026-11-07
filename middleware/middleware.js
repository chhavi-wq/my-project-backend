const jwt = require('jsonwebtoken');
const User = require('../models/model');

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthenticated user' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'Unauthenticated user' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;