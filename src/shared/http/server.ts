import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(4433, () => {
  console.log(
    'Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde. - Dr Consulta',
  );
});
