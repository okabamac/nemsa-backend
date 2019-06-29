import express from 'express';
import recertController from '../controllers/recertCtrl';
import Authservice from '../middleware/auth.service';
import bodyValidation from '../middleware/validation/bodyValidator';
import paramValidation from '../middleware/validation/paramValidator';

const router = express.Router();

router
  .get('/', [Authservice.authenticate], recertController.getRecerts)
  .get('/:meterNumber', [Authservice.authenticate, paramValidation], recertController.getOneRecert)
  .post('/addRecert', [Authservice.authenticate, bodyValidation], recertController.addRecert);

export default router;
