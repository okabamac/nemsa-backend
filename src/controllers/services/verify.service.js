import Type from '../../models/typeTest.model';
import Routine from '../../models/routineTest.model';
import Recert from '../../models/recert.model';

class VerifyService {
  static async getSpecificMeter(req) {
    try {
      const { seal } = req;
      const [meter1, meter2, meter3] = await Promise.all([
        Routine.findOne({
          seal,
        }), Type.findOne({
          seal,
        }), Recert.findOne({
          seal,
        })]);
      if (meter1 !== null) return meter1;
      if (meter2 !== null) return meter2;
      if (meter3 !== null) return meter3;
      if (!meter1 && !meter2 && !meter3) throw new Error('Meter does not exist');
    } catch (err) {
      throw err;
    }
  }
}
export default VerifyService;
