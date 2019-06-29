import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecertificationSchema = new Schema({
  disco: { type: String, required: true },
  state: { type: String, required: true },
  business_unit_name: { type: String, required: true },
  customer_name: { type: String, required: true },
  customer_address: { type: String, required: true },
  customer_phone_number: { type: String, required: true },
  customer_email: { type: String, required: true },
  yom: { type: Date, required: true },
  country: { type: String, required: true },
  tariff_class_name: { type: String, required: true },
  meter_type: { type: String, required: true },
  meter_class: { type: String, required: true },
  date_added: { type: Date, required: false, default: new Date() },
  meter_number: { type: Number, required: true },
  meter_model: { type: String, required: true },
  date_of_routine_test: { type: Date, required: true },
  date_of_last_recert: { type: Date, required: true },
  tariff_charges: { type: String, required: true },
  test_measurement_error: { type: String, required: true }
});
const Recertification = mongoose.model(
  'Recertification',
  RecertificationSchema,
);

export default Recertification;
