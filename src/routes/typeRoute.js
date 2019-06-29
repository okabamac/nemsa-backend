import express from 'express';
import typeController from '../controllers/typeCtrl';
import Authservice from '../middleware/auth.service';
import bodyValidation from '../middleware/validation/bodyValidator';
import paramValidation from '../middleware/validation/paramValidator';

const router = express.Router();

router
  .get('/', [Authservice.authenticate], typeController.getTypes)
  .get('/:meterNumber', [Authservice.authenticate, paramValidation], typeController.getOneType)
  .post(
    '/addType',
    [Authservice.authenticate, bodyValidation],
    [Authservice.authenticate, bodyValidation],
    typeController.addType,
  );

export default router;
