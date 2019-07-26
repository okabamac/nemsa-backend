import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoutineSchema = new Schema({
  vendor_type: { type: String, required: true },
  country: { type: String, required: true },
  vendor_name: { type: String, required: true },
  vendor_email: { type: String, required: true },
  vendor_phone_number: { type: String, required: true },
  seal: { type: String, required: true },
  yom: { type: Date, required: true },
  batch_id: { type: String, required: true },
  batch_qty: { type: Number, required: true },
  state: { type: String, required: true },
  meter_model: { type: String, required: true },
  meter_class: { type: String, required: true },
  date_added: { type: Date, required: false, default: new Date() },
  meter_type: { type: String, required: true },
  meter_number: { type: Number, required: true },
  date_of_routine_test: { type: Date, required: true },
  expiry_date_after_routine_test: { type: Date, required: true },
  tariff_charges: { type: String, required: true },
  staff_id: { type: String, required: true },
});
const Routine = mongoose.model('Routine', RoutineSchema);

export default Routine;
