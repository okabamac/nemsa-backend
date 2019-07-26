import RoutineService from './services/routine.service';

import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

class RoutineController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof RoutineController
   */

  static async addRoutine(req, res) {
    try {
      const Routine = await RoutineService.addRoutine(req);
      if (Routine) {
        return response.sendSuccess(
          res,
          200,
          Routine,
          'Routine Test successfully added',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async getAllRoutines(req, res) {
    try {
      const payload = await RoutineService.getAllRoutines(req);
      if (payload) {
        return response.sendSuccess(
          res,
          200,
          payload,
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 404, error.message);
    }
  }

  static async getOneRoutine(req, res) {
    try {
      const payload = await RoutineService.getOneRutine(req.params);
      if (payload) {
        return response.sendSuccess(
          res,
          200,
          payload,
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 404, error.message);
    }
  }
}
export default RoutineController;
