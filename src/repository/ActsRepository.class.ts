import { Acts } from '../entities/Acts.model';

export class ActsRepository {
  public static getActs = async () => {
    return Acts.findAll({
      attributes: ['id', ['desc_hecho', 'text']],
      raw: true,
      nest: true
    });
  };
}
