import { UniqueRegisterVictimsRepository } from '../../repository/UniqueRegisterVictimasRepository.class';

export class UniqueVictimsRegisterService {

  public static getFirstLevelData = async () => {
    return UniqueRegisterVictimsRepository.getFirstLevelData();
  };


  public static processUniqueVictimsRegister = async (dptoIds: number[], params: any) => {
    return UniqueRegisterVictimsRepository.getUniqueRegisterVictims(dptoIds, params);
  };
}
