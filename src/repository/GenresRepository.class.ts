import { Genres } from '../entities/Genres.model';

export class GenresRepository {
  public static getGenres = async () => {
    return Genres.findAll({
      attributes: ['id', ['genero', 'text']],
      raw: true,
      nest: true
    });
  };
}
