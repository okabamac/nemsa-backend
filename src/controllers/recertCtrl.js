import RecertService from './services/recert.service';

import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

class RecertController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof RecertController
   */

  static async addRecert(req, res) {
    try {
      const Recert = await RecertService.addRecert(req);
      if (Recert) {
        return response.sendSuccess(
          res,
          200,
          Recert,
          'Recertification successfully added',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async getRecerts(req, res) {
    try {
      const payload = await RecertService.getRecerts(req);
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

  static async getOneRecert(req, res) {
    try {
      const payload = await RecertService.getOneRecert(req.params);
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
export default RecertController;
