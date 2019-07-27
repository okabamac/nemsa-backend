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
      const data = await Tests[j].aggregate([
        {
          $project: {
            month: { $month: '$date_added' },
            state: 1,
            meter_number: 1,
            date_of_routine_test: 1,
            expiry_date_after_routine_test: 1,
            vendor_name: 1,
            seal: 1,
            date_certified: 1,
            expiry_date_after_cert: 1,
            business_unit_name: 1,
            date_of_last_recert: 1,
          },
        },
        {
          $match: {
            month: Number(req.query.month),
            state: req.query.state.replace(/ /g, ''),
          },
        },
      ]);

      if (data.length === 0) {
        return response.sendSuccess(res, 404, 'No Available Data');
      }
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
      if (data.length === 0) {
        return response.sendSuccess(res, 404, 'No Available Data');
      }
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
        staff_id: req.query.staff_id,
      });
      if (data.length === 0) {
        return response.sendSuccess(res, 404, 'No Available Data');
      }
      return response.sendSuccess(res, 200, data);
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
