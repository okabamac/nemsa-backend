import dotenv from 'dotenv';

dotenv.config();
const keys = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  mongoUri: process.env.MONGO_URI,
};
export default keys;
