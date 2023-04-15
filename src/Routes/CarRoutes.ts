import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carsRoutes = Router();

carsRoutes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).createNewCar(),
);

export default carsRoutes;