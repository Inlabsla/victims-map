import { IResourceFiles } from '../../models/dataModels/IResourceFiles.model';
import { IResourceResponse } from '../../models/dataModels/IResourceResponse.model';
import { MemoriesRepository } from '../../repository/MemoriesRepository.class';
import { ResourcesFilesService } from './ResourcesFilesService.class';

export class MemoriesService {
  public static processMemories = async (
    params: any
  ): Promise<IResourceResponse> => {
    const allInformation: any = await MemoriesRepository.getMemoriesData(params);
    const resourceFiles: any[] = await ResourcesFilesService.processResourcesFiles(
      params
    );

    if (!allInformation) {
      throw new Error('No data found for resource id');
    }

    if (!resourceFiles.length) {
      throw new Error('No data found for resource id');
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
        resourceFiles
      },
      territoryName: allInformation.dpto.nombre_dpto
    };
  };
}
