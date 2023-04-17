import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  public createCarDomain(car: ICar | null): Car | null {
    if (car) return new Car(car);
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findCars() {
    const carODM = new CarODM();
    const cars = await carODM.findAll();
    return cars.map((item) => this.createCarDomain(item));
  }

  public async findOneCar(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findOne(id);

    if (!car) return { type: 404, message: 'Car not found' };

    return {
      type: null,
      message: this.createCarDomain(car),
    };
  }
}

export default CarService;