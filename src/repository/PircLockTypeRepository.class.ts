import { PircLockType } from '../entities/PircLockTime.model';

export class PircLockTypeRepository {
  public static getPircLockType = async () => {
    return PircLockType.findAll({
      attributes: ['id', ['tipo_cierre_pirc', 'text']],
      raw: true,
      nest: true
    });
  };
}
