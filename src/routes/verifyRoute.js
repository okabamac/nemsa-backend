import express from 'express';
import verifyCtrl from '../controllers/verifyCtrl';

const router = express.Router();

router
  .get(
    '/:seal',
    verifyCtrl.getVerify,
  );

export default router;
