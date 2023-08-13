const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const error500 = require('./middlewares/error500');
const cors = require('cors')
const cookies = require('cookie-parser');

const ERROR_404_NOTFOUND = 404;

const { PORT = 3000 } = process.env;

const app = express();
app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });
app.use(cors({ origin: ['http://localhost:3001', 'https://davatim.nomoreparties.co'], credentials: true, maxAge:300 }));
// app.use(cors({ origin: ('https://davatim.nomoreparties.co'), credentials: true, maxAge:18600 }));


mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Подключено к Mongo успешно'))
  .catch((err) => {
    console.error('Ошибка при подключении к Mongo:', err);
  });

app.use(express.json());
app.use(cookies())

app.use(helmet());
app.use(router);

app.use('/', (_req, res) => {
  res.status(ERROR_404_NOTFOUND).send({ message: 'Данная страница не найдена' });
});

app.use(errors());

app.use(error500);

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
