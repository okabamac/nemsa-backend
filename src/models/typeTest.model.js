import mongoose from 'mongoose';

const { Schema } = mongoose;
const TypeSchema = new Schema({
  vendor_name: { type: String, required: true },
  country: { type: String, required: true },
  meter_type: { type: String, required: true },
  meter_number: { type: Number, required: true },
  meter_make: { type: String, required: true },
  meter_rating: { type: String, required: true },
  meter_class: { type: String, required: true },
  state: { type: String, required: true },
  date_added: { type: Date, required: false, default: new Date() },
  date_certified: { type: Date, required: true },
  expiry_date_after_cert: { type: Date, required: true },
  vendor_email: { type: String, required: true },
  vendor_phone_number: { type: String, required: true },
  staff_id: { type: String, required: true },
});
const Type = mongoose.model('Type', TypeSchema);
export default Type;
