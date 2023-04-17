import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).createNewMotorcycle(),
);

/* carsRoutes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAllCars(),
);

carsRoutes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findCarById(),
); */

export default motorcycleRoutes;