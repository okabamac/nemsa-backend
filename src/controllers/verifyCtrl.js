import VerifyService from './services/verify.service';

import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

class VerifyController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof VerifyController
   */

  static async getVerify(req, res) {
    if (!req.params) {
      return response.sendError(
        res,
        400,
        'Please enter a seal number',
      );
    }
    try {
      const payload = await VerifyService.getSpecificMeter(req.params);
      if (payload) {
        return response.sendSuccess(
          res,
          200,
          payload,
          'Data retrieved successfully',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 404, error.message);
    }
  }
}
export default VerifyController;
