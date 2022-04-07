import { Categories } from '../entities/Categories.model';
import { Memories } from '../entities/Memories.model';
import { Resources } from '../entities/Resources.model';

export class MemoriesRepository {
  public static getMemories = async () => {
    return Memories.findAll({
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
    });
  };
}
