import { PhaseStatusRepository } from '../../repository/PhaseStatusRepository.class';

export class PhaseStatusService {
  public static processPhaseStatus = async () =>
    PhaseStatusRepository.getPhaseStatus();
}
