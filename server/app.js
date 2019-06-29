import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import keys from '../src/utilities/config';
import userRoute from '../src/routes/userRoute';
import typeRoute from '../src/routes/typeRoute';
import routineRoute from '../src/routes/routineRoute';
import recertRoute from '../src/routes/recertRoute';
import verifyRoute from '../src/routes/verifyRoute';
import reportRoute from '../src/routes/reportRoute';

const app = express();

mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/type', typeRoute);
app.use('/api/v1/routine', routineRoute);
app.use('/api/v1/recert', recertRoute);
app.use('/api/v1/verify', verifyRoute);
app.use('/api/v1/report', reportRoute);
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Sorry, we couldn\'t find that!',
  });
});

export default app;
