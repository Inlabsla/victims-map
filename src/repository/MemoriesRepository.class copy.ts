import { Categories } from '../entities/Categories.model';
import { Departments } from '../entities/Departments.model';
import { Fonts } from '../entities/Fonts.model';
import { InputType } from '../entities/InputType.model';
import { Memories } from '../entities/Memories.model';
import { Resources } from '../entities/Resources.model';

export class MemoriesRepository {
  public static getMemories = async (params: any) => {
    const data = await Memories.findOne({
      attributes: ['id', 'id_recurso'],
      include: [
        {
          model: Categories,
          attributes: ['categorias', 'pregunta_asociada'],
          required: true
        },
        {
          model: Fonts,
          attributes: ['fuente'],
          required: true
        },
        {
          model: Departments,
          attributes: ['nombre_dpto'],
          required: true
        },
        {
          model: InputType,
          attributes: ['tipo_insumo'],
          required: true
        },
        {
          model: Resources,
          attributes: ['titulo_recurso', 'descripcion_recurso'],
          required: true
        }
      ],
      raw: true,
      nest: true,
      where: {
        id: params.resourceId
      }
    });
    
    return data
  };
}
