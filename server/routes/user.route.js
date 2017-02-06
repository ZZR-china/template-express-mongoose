import express from 'express';
import userCtrl from '../controller/user.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(userCtrl.getAll)
      .post(userCtrl.create);

router.route('/:user')
      .get(userCtrl.show)
      .put(userCtrl.update)
      .delete(userCtrl.destroy);

router.route('/:user/lover')
      .get(userCtrl.showLover);

export default router;