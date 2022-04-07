import { ResourcesFilesService } from './ResourcesFilesService.class';
import { MemoriesRepository } from '../../repository/MemoriesRepository.class';
import { IResourceResponse } from '../../models/dataModels/IResourceResponse.model';
import { IResourceFiles } from '../../models/dataModels/IResourceFiles.model';

export class MemoriesService {
  public static processMemories = async (
    params: any
  ): Promise<IResourceResponse> => {
    const allInformation: any = await MemoriesRepository.getMemories(params);
    const resourceFiles: any[] = await ResourcesFilesService.processResourcesFiles(
      params
    );

    if (!allInformation) {
      throw 'No data found for resource id';
    }

    if (!resourceFiles.length) {
      throw 'No data found for resource id';
    }

    return {
      id: allInformation.id,
      resourceId: allInformation.id_recurso,
      category: allInformation.category.categorias,
      relatedCategoryQuestion: allInformation.category.pregunta_asociada,
      font: allInformation.font.fuente,
      inputType: allInformation.inputType.tipo_insumo,
      resource: {
        resourceDescription: allInformation.resource.descripcion_recurso,
        resourceTittle: allInformation.resource.titulo_recurso,
        resourceFiles: resourceFiles
      },
      territoryName: allInformation.dpto.nombre_dpto
    };
  };
}
