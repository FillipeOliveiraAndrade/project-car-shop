import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import carMocks from '../../mocks/carMocks';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

const carInput: ICar = {
  model: 'Opala',
  year: 2000,
  color: 'red',
  status: true,
  buyValue: 6.000,
  doorsQty: 2,
  seatsQty: 5,
  id: '642b0df19506445d7b0bc77b',
};

const carOutput: Car = new Car({
  model: 'Opala',
  year: 2000,
  color: 'red',
  status: true,
  buyValue: 6.000,
  doorsQty: 2,
  seatsQty: 5,
});

describe('Testando endpoint /cars', function () {
  it('Deveria criar um novo carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria listar todos os carros', async function () {
    const carsOutput = carMocks.map((car) => new Car(car));
    sinon.stub(Model, 'find').resolves(carsOutput);

    const service = new CarService();
    const result = await service.findCars();

    expect(result).to.be.deep.equal(carsOutput);
  });

  it('Deveria listar um carro encontrado pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(carMocks[0]);
    const id = '634852326b35b59438fbea2f';

    const service = new CarService();
    const { message } = await service.findOneCar(id);

    expect(message).to.be.deep.equal(carMocks[0]);
  });

  it('Deveria lançar uma exceção quando a id não existe', async function () {
    const carId = '000000';

    sinon.stub(Model, 'findOne').resolves(false);

    const service = new CarService();
    const { message } = await service.findOneCar(carId);
    expect(message).to.be.equal('Car not found');
  });

  it('Deveria atualizar um carro com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
    const id = '642b0df19506445d7b0bc77b';

    const service = new CarService();
    const { message } = await service.updateCar(id, carInput);

    expect(message).to.be.deep.equal(carOutput);
  });

  afterEach(function () { return sinon.restore(); });
});