import express from 'express';
import userCtrl from '../controllers/userCtrl';
import Authservice from '../middleware/auth.service';
import bodyValidation from '../middleware/validation/bodyValidator';
import paramValidation from '../middleware/validation/paramValidator';

const router = express.Router();

router
  .post('/login', [bodyValidation], userCtrl.login)
  .get('/', [Authservice.authenticate, Authservice.isAdmin], userCtrl.getALlUsers)
  .get('/:id', [Authservice.authenticate, Authservice.isAdmin, paramValidation], userCtrl.getOneUser)
  .post('/addUser', [Authservice.authenticate, Authservice.isAdmin, bodyValidation], userCtrl.addUser)
  .post('/reset/:token', [bodyValidation], userCtrl.reset)
  .post('/requestReset', [bodyValidation], userCtrl.requestReset)
  .delete('/:id', [Authservice.authenticate, Authservice.isAdmin, paramValidation], userCtrl.delete);


export default router;
