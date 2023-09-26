import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import registrationRoutes from './routes/registrationRoutes';
import customersRoutes from './routes/customersRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/ZenApp', {
})
  .then(() => {
    console.log('Połączono z bazą danych MongoDB');
  })
  .catch((error) => {
    console.error('Błąd podczas łączenia z bazą danych MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', registrationRoutes);
app.use('/api', customersRoutes);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
