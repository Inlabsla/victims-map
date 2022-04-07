import { GenresRepository } from '../../repository/GenresRepository.class';

export class GenresService {
  public static processGenres = async () => GenresRepository.getGenres();
}
