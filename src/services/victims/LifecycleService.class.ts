import { LifeCycleRepository } from '../../repository/LifecycleRepository.class';

export class LifecycleService {
  public static processLifeCycle = async () =>
    LifeCycleRepository.getLifeCycles();
}
