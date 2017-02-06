import express from 'express';
import validate from 'express-validation';
import smsCtrl from '../controller/sms.controller';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth - Returns token if correct username and phone is provided */
router.route('/:mobilePhoneNumber')
      .get(smsCtrl.requestSmsCode)

export default router;
