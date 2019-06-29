import express from 'express';
import ReportCtrl from '../controllers/reportCtrl';
import Authservice from '../middleware/auth.service';
import queryValidation from '../middleware/validation/queryValidator';

const router = express.Router();

router
  .get('/byState', [Authservice.authenticate, Authservice.isAdmin, queryValidation], ReportCtrl.byState)
  .get('/byDate', [Authservice.authenticate, Authservice.isAdmin, queryValidation], ReportCtrl.byDate)
  .get('/byBatch', [Authservice.authenticate, Authservice.isAdmin, queryValidation], ReportCtrl.byBatch);

export default router;
