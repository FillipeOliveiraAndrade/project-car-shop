import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carsRoutes = Router();

carsRoutes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).createNewCar(),
);

carsRoutes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAllCars(),
);

carsRoutes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findCarById(),
);

export default carsRoutes;