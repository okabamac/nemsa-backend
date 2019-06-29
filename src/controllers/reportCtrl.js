import Routine from '../models/routineTest.model';
import Type from '../models/typeTest.model';
import Recert from '../models/recert.model';


import ResponseGenerator from '../utilities/responseGen';

const response = new ResponseGenerator();

const Tests = [Routine, Type, Recert];
const options = ['routine', 'type', 'recertification'];


class ReportControls {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof ReportController
   */

  static async byState(req, res) {
    try {
      const j = await ReportControls.search(req);
      const data = await Tests[j]
        .find({
          state: req.query.state,
        });
      return response.sendSuccess(
        res,
        200,
        data,
        'Data successfully retrieved',
      );
    } catch (err) {
      return response.sendSuccess(
        res,
        500,
        'Please try again later',
      );
    }
  }

  static async search(req) {
    let number;
    for (let i = 0; i < options.length; i++) {
      if (options[i] === req.query.test) {
        number = i;
      }
    }
    return number;
  }

  static async byDate(req, res) {
    try {
      const j = await ReportControls.search(req);
      const data = await Tests[j]
        .find({
          date_added: {
            $gte: `${req.query.from}`,
            $lt: `${req.query.to}`,
          },
        });
      return response.sendSuccess(
        res,
        200,
        data,
        'Data successfully retrieved',
      );
    } catch (err) {
      return response.sendSuccess(
        res,
        500,
        'Please try again later',
      );
    }
  }

  static async byBatch(req, res) {
    try {
      const data = await Tests[0].find({
        batch_id: req.query.batch_id,
      });
      return response.sendSuccess(res, 200, data, 'Data successfully retrieved');
    } catch (err) {
      return response.sendSuccess(
        res,
        500,
        'Please try again later',
      );
    }
  }
}
export default ReportControls;
