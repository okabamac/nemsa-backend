/* eslint-disable camelcase */
import crypto from 'crypto';
import Routine from '../../models/routineTest.model';

class RoutineService {
  /** Signs routine into account
   * @description signs routine into their account
   * @param {object} a new routine object
   */

  static async addRoutine(req) {
    try {
      const {
        vendor_type,
        country,
        vendor_name,
        vendor_email,
        vendor_phone_number,
        yom,
        batch_id,
        batch_qty,
        state,
        meter_model,
        meter_class,
        meter_type,
        meter_number,
        date_of_routine_test,
        tariff_charges,
      } = req.body;
      const [seal, date] = await Promise.all([
        `nemsa/${state.replace(/\s/g, '').toLowerCase()}/${crypto.randomBytes(5).toString('hex')}`,
        RoutineService.addYear(new Date(), 2),
      ]);
      const expiry_date_after_routine_test = date;

      const routine = new Routine({
        vendor_type,
        country,
        vendor_name,
        vendor_email,
        vendor_phone_number,
        yom,
        batch_id,
        batch_qty,
        state,
        meter_model,
        meter_class,
        meter_type,
        meter_number,
        date_of_routine_test,
        expiry_date_after_routine_test,
        tariff_charges,
        seal,
      });
      const meter = await Routine.findOne({
        meter_number,
      });
      if (meter !== null) {
        throw new Error('This meter number has already been registered');
      }
      await routine.save();
      return 'Success';
    } catch (err) {
      throw err;
    }
  }

  static async addYear(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }

  static async getAllRoutines(req) {
    try {
      return await Routine.find();
    } catch (err) {
      throw err;
    }
  }

  static async getOneRutine(req) {
    try {
      const { meterNumber } = req;
      const routine = await Routine.findOne({ meter_number: meterNumber });
      if (!routine) throw new Error('Meter does not exist');
      return routine;
    } catch (err) {
      throw err;
    }
  }
}
export default RoutineService;
