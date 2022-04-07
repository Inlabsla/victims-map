import { MemoriesRepository } from '../../repository/MemoriesRepository.class';

export class MemoriesService {
  public static processMemories = async () => MemoriesRepository.getMemories();
}
