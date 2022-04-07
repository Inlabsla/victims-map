import { ResourcesFiles } from '../entities/ResourcesFiles.model'

export class ResourcesFilesRepository {
  public static getResourcesFiles = async (params: any) => {
    return ResourcesFiles.findAll({
      attributes: [
        ['nombre_archivo', 'filename'],
        ['descripcion_archivo', 'fileDescription'],
        ['url_s3_archivo', 'fileLink'],
        ['external_url', 'externalLink'],
      ],
      raw: true,
      nest: true,
      where: {
        id_recurso: params.resourceId,
      },
    })
  }
}
