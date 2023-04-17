import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createNewCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const newCar = await this.service.createCar(car);
    return this.res.status(201).json(newCar);
  }

  public async updateCarById() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' }); 

    const { type, message } = await this.service.updateCar(id, this.req.body);
    if (type) return this.res.status(type).json({ message });
    
    return this.res.status(200).json(message);
  }

  public async findAllCars() {
    const cars = await this.service.findCars();
    return this.res.status(200).json(cars);
  }

  public async findCarById() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' }); 

    const { type, message } = await this.service.findOneCar(id);
    if (type) return this.res.status(type).json({ message });

    return this.res.status(200).json(message);
  }
}

export default CarController;