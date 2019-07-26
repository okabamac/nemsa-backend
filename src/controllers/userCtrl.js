import UserService from './services/user.service';

import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

class UserController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      if (user) {
        return response.sendSuccess(res, 200, user, 'Successful login');
      }
      return response.sendError(res, 400, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 401, error.message);
    }
  }

  static async addUser(req, res) {
    try {
      const user = await UserService.addUser(req);
      if (user) {
        return response.sendSuccess(res, 200, user, 'User successfully added');
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      if (error.syscall) {
        return response.sendError(
          res,
          500,
          'Email service is currently down, please try add the user again later',
        );
      }
      return response.sendError(res, 400, error.message);
    }
  }

  static async requestReset(req, res) {
    try {
      const user = await UserService.requestReset(req);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'An email has been sent to the registered email with further instructions',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async reset(req, res) {
    try {
      const user = await UserService.reset(req);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'Password successfully changed',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async getALlUsers(req, res) {
    try {
      const payload = await UserService.getAllUsers(req);
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

  static async getOneUser(req, res) {
    try {
      const payload = await UserService.getOneUser(req.params);
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

  static async delete(req, res) {
    try {
      const user = await UserService.deleteUser(req.params);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'User successfully deleted',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}
export default UserController;
