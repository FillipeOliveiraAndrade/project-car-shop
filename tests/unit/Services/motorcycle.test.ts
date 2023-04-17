import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import motorcyleMocks from '../../mocks/motorcycleMocks';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const motorcycleOutput: Motorcycle = new Motorcycle({
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  id: '642b1159be4b3a0428baf084',
  category: 'Street',
  engineCapacity: 600,
});

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

describe('Testando endpoint /motorcyles', function () {
  it('Deveria criar um novo motorcycle com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria listar todos os motorcyles', async function () {
    const motorcyclesOutput = motorcyleMocks.map((motorcyles) => new Motorcycle(motorcyles));
    sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const service = new MotorcycleService();
    const result = await service.findMotorcycles();

    expect(result).to.be.deep.equal(motorcyclesOutput);
  });

  it('Deveria listar um motorcycle encontrado pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcyleMocks[0]);
    const id = '634852326b35b59438fbea2f';

    const service = new MotorcycleService();
    const { message } = await service.findOneMotorcycle(id);

    expect(message).to.be.deep.equal(motorcyleMocks[0]);
  });

  it('Deveria lançar uma exceção quando a id não existe', async function () {
    const MotorcycleId = '000000';

    sinon.stub(Model, 'findOne').resolves(false);

    const service = new MotorcycleService();
    const { message } = await service.findOneMotorcycle(MotorcycleId);
    expect(message).to.be.equal('Motorcycle not found');
  });

  it('Deveria atualizar uma moto com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const { message } = await service.updateMotorcycle('642b0df19506445d7b0bc77b', motorcycleInput);

    expect(message).to.be.deep.equal(motorcycleOutput);
  });

  it('Deve retornar null caso seja um valor null', async function () {
    const service = new MotorcycleService();
    const result = service.createMotorcycleDomain(null);

    expect(result).to.be.equal(null);
  });

  afterEach(function () { return sinon.restore(); });
});