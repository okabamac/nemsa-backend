/* eslint-disable camelcase */
import crypto from 'crypto';
import Type from '../../models/typeTest.model';

class TypeService {
  /** Signs Type into account
   * @description signs Type into their account
   * @param {object} a new Type object
   */

  static async addType(req) {
    try {
      const {
        vendor_name,
        country,
        meter_type,
        meter_number,
        meter_make,
        meter_rating,
        meter_class,
        date_certified,
        vendor_email,
        vendor_phone_number,
        state,
      } = req.body;

      const [seal, date] = await Promise.all([`nemsa/${state.replace(/\s/g, '').toLowerCase()}/${crypto.randomBytes(5).toString('hex')}`, TypeService.addYear(new Date(), 2)]);
      const expiry_date_after_cert = date;

      const type = new Type({
        vendor_name,
        country,
        meter_type,
        meter_number,
        meter_make,
        meter_rating,
        meter_class,
        date_certified,
        vendor_email,
        seal,
        state,
        vendor_phone_number,
        expiry_date_after_cert,
      });
      const meter = await Type.findOne({
        meter_number,
      });
      if (meter !== null) {
        throw new Error('This meter number has already been registered');
      }
      await type.save();
      return 'Success';
    } catch (err) {
      throw err;
    }
  }

  static async addYear(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }

  static async getTypes(req) {
    try {
      return await Type.find();
    } catch (err) {
      throw err;
    }
  }

  static async getOneType(req) {
    try {
      const { meterNumber } = req;
      const type = await Type.findOne({ meter_number: meterNumber });
      if (!type) throw new Error('Meter does not exist');
      return type;
    } catch (err) {
      throw err;
    }
  }
}
export default TypeService;
