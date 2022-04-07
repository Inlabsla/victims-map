import { PhaseStatus } from '../entities/PhaseStatus.model';

export class PhaseStatusRepository {
  public static getPhaseStatus = async () => {
    return PhaseStatus.findAll({
      attributes: ['id', ['estado_fase', 'text']],
      raw: true,
      nest: true
    });
  };
}
