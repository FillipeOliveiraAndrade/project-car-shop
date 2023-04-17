import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createNewMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const newMotorcycle = await this.service.createMotorcycle(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }

  public async updateMotorcycleById() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' }); 

    const { type, message } = await this.service.updateMotorcycle(id, this.req.body);
    if (type) return this.res.status(type).json({ message });
    
    return this.res.status(200).json(message);
  }

  public async findAllMotorcycle() {
    const motorcycles = await this.service.findMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async findMotorcycleById() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' }); 

    const { type, message } = await this.service.findOneMotorcycle(id);
    if (type) return this.res.status(type).json({ message });

    return this.res.status(200).json(message);
  }
}

export default MotorcycleController;