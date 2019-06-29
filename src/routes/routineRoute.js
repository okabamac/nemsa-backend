import express from 'express';
import routineController from '../controllers/routineCtrl';
import Authservice from '../middleware/auth.service';
import bodyValidation from '../middleware/validation/bodyValidator';
import paramValidation from '../middleware/validation/paramValidator';


const router = express.Router();

router
  .get('/', [Authservice.authenticate], routineController.getAllRoutines)
  .get('/:meterNumber', [Authservice.authenticate, paramValidation], routineController.getOneRoutine)
  .post('/addRoutine', [Authservice.authenticate, bodyValidation], routineController.addRoutine);

export default router;
