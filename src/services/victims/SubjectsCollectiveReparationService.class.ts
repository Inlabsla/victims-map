import { SubjectsCollectiveReparationRepository } from '../../repository/SubjectsCollectiveReparationRepository.class';

export class SubjectsCollectiveReparationService {
  public static processSubjectsCollectiveReparation = async (params: any) => {
    return SubjectsCollectiveReparationRepository.getSubjectsCollectiveReparationRepository(params);
  };
}
