import { Disabilities } from '../entities/Disabilities.model';

export class DisabilitiesRepository {
  public static getLifeCycles = async () => {
    return Disabilities.findAll({
      attributes: ['id', ['desc_discapacidad', 'text']],
      raw: true,
      nest: true,
      order: [['id', 'asc']]
    });
  };
}
