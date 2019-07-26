import TypeService from './services/type.service';

import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

class TypeController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof TypeController
   */

  static async addType(req, res) {
    try {
      const Type = await TypeService.addType(req);
      if (Type) {
        return response.sendSuccess(
          res,
          200,
          Type,
          'Type successfully added',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async getTypes(req, res) {
    try {
      const payload = await TypeService.getTypes(req);
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

  static async getOneType(req, res) {
    try {
      const payload = await TypeService.getOneType(req.params);
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
export default TypeController;
