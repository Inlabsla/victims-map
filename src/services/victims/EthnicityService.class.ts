import { EthnicityRepository } from '../../repository/EthnicityRepository.class';

export class EthnicityService {
  public static processEthnicity = async () =>
  EthnicityRepository.getEthnicity()
}
