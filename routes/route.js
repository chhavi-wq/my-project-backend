const express = require('express');
const router = express.Router();
const c = require('../controllers/controller');
const paymentRoutes = require('./paymentRoutes');
const auth = require('../middleware/middleware');
const admin = require('../middleware/adminMiddleware');

router.post('/signup', c.signup); //working
router.post('/verify-otp', c.verifyOtp); //working 
router.post('/resend-otp', c.resendOtp); //working 
router.post('/send-otp', c.sendOtp); //working
router.post('/login', c.login); //working
router.get('/users', admin, c.getAllUsers); //working
router.get('/users/search', auth, c.searchUser); //working
router.get('/users/:id', auth, c.getUserById); //working 
router.put('/users/:id', auth, c.updateUser); //working 
router.put('/users/:id/password', auth, c.updatePassword); // working 
router.delete('/users/:id', admin, c.deleteUser); //working 

router.post('/orders', c.createOrder); 
router.get('/orders', c.getAllOrders);
router.get('/orders/user/:userId', auth, c.getMyOrders);
router.put('/orders/:id/status', admin, c.updateOrderStatus);
router.delete('/orders/:id', admin, c.deleteOrder);

router.use('/payment', paymentRoutes);

module.exports = router;
