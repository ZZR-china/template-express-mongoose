import express from 'express';
import userRoutes from './user.route';
import qrRoutes from './qr.route';
import captchaRoutes from './captcha.route';
import authRoutes from './auth.route';
import smsRoutes from './sms.route';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("车窗app， 2016年底震撼上线， 小米store, apple store...etc");
});

router.use('/users', userRoutes);
router.use('/qr', qrRoutes);
router.use('/captcha', captchaRoutes);
router.use('/auth', authRoutes);
router.use('/sms', smsRoutes);

export default router;
