/* eslint-disable camelcase */
import crypto from 'crypto';
import Recert from '../../models/recert.model';

class RecertService {
  /** Signs recert into account
   * @description signs recert into their account
   * @param {object} a new recert object
   */

  static async addRecert(req) {
    try {
      const {
        disco,
        state,
        business_unit_name,
        customer_name,
        customer_address,
        customer_phone_number,
        customer_email,
        yom,
        country,
        tariff_class_name,
        meter_type,
        meter_class,
        meter_number,
        meter_model,
        date_of_routine_test,
        date_of_last_recert,
        tariff_charges,
        test_measurement_error,
      } = req.body;
      const [seal, date] = await Promise.all([
        `nemsa/${state
          .replace(/\s/g, '')
          .toLowerCase()}/${crypto.randomBytes(5).toString('hex')}`,
        RecertService.addYear(new Date(), 2),
      ]);
      const expiry_date_after_recert = date;

      const recert = new Recert({
        disco,
        state,
        business_unit_name,
        customer_name,
        customer_address,
        customer_phone_number,
        customer_email,
        yom,
        country,
        tariff_class_name,
        meter_type,
        meter_class,
        meter_number,
        meter_model,
        seal,
        date_of_routine_test,
        date_of_last_recert,
        expiry_date_after_recert,
        tariff_charges,
        test_measurement_error,
      });
      const meter = await Recert.findOne({
        meter_number,
      });
      if (meter !== null) {
        throw new Error('This meter number has already been registered');
      }
      recert.save();
      return 'Success';
    } catch (err) {
      throw err;
    }
  }

  static async addYear(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }

  static async getRecerts(req) {
    try {
      return await Recert.find();
    } catch (err) {
      throw err;
    }
  }

  static async getOneRecert(req) {
    try {
      const { meterNumber } = req;
      const routine = await Recert.findOne({ meter_number: meterNumber });
      if (!routine) throw new Error('Meter does not exist');
      return routine;
    } catch (err) {
      throw err;
    }
  }
}
export default RecertService;
