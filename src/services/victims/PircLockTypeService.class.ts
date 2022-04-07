import { PircLockTypeRepository } from '../../repository/PircLockTypeRepository.class';

export class PircLockTypeService {
  public static processPircLockType = async () =>
    PircLockTypeRepository.getPircLockType();
}
