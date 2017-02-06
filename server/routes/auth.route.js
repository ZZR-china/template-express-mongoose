import express from 'express';
import expressJwt from 'express-jwt';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controller/auth.controller';
import config from '../../config/env';

const router = express.Router();
/** POST /api/auth - Returns token if correct username and phone is provided */
router.route('/')
	    .get(authCtrl.get)
	    .post(authCtrl.create);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random')
   	  .get(authCtrl.getRandomNumber);

export default router;
