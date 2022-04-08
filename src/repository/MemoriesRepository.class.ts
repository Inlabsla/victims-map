import { Categories } from '../entities/Categories.model';
import { Memories } from '../entities/Memories.model';
import { Fonts } from '../entities/Fonts.model';
import { Departments } from '../entities/Departments.model';
import { InputType } from '../entities/InputType.model';
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

  public static getMemoriesData = async (params: any) => {
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

    console.warn('data====>', JSON.stringify(data))
    
    return data
  };
}
