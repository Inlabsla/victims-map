import { DisabilitiesRepository } from '../../repository/DisabilitiesRepository.class';

export class DisabilitiesService {
  public static processDisabilities = async () =>
  DisabilitiesRepository.getLifeCycles();
}
