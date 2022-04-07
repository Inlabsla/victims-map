import { ResourcesFilesRepository } from '../../repository/ResourcesFilesRepository.class';

export class ResourcesFilesService {
  public static processResourcesFiles = async (params: any) =>
    ResourcesFilesRepository.getResourcesFiles(params);
}
