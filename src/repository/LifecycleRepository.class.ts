import { LifeCycle } from '../entities/LifeCycle.model';

export class LifeCycleRepository {
  public static getLifeCycles = async () => {
    return LifeCycle.findAll({
      attributes: ['id', ['ciclo_vital', 'text']],
      raw: true,
      nest: true
    });
  };
}
