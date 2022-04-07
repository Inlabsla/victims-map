import { Categories } from '../entities/Categories.model';
import { Memories } from '../entities/Memories.model';
import { Resources } from '../entities/Resources.model';

export class MemoriesRepository {
  public static getMemories = async (params: any) => {

    let whereQuery = {}
    let options = {
      attributes: ['id', 'id_dpto'],
      include: [
        {
          model: Categories,
          attributes: ['categorias']
        },
        {
          model: Resources,
          attributes: ['id', 'titulo_recurso']
        }
      ],
      raw: true,
      nest: true
    }

    if(params && params.dpto && params.dpto !== 'all'){
      whereQuery = {
        where: {
          id_dpto: params.dpto
        }
      }
      options = {...options, ...whereQuery}
    }

    return Memories.findAll(options);
  };
}
