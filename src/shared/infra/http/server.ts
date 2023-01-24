import 'reflect-metadata';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
    const server = app.listen(4433, () => {
    console.log('Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde. - Dr Consulta');
  });
});
