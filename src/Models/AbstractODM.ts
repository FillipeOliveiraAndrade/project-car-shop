import { Model, Schema, model, models } from 'mongoose';

class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

/*   public async findAll(): Promise<T[]> {
    const cars = this.model.find({});
    return cars;
  }

  public async findOne(_id: string): Promise<T | null> {
    const car = this.model.findOne({ _id });
    return car;
  } */
}

export default AbstractODM;