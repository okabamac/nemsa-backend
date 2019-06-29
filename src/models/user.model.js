import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: false },
  staff_id: { type: String, required: true },
  staff_email: { type: String, required: true },
  date_added: { type: Date, required: false, default: new Date() },
  is_admin: { type: Boolean, required: true },
  reset_password_token: { type: String, required: true },
  reset_password_expires: { type: Date, required: true },
});
const User = mongoose.model('User', UserSchema);
export default User;
