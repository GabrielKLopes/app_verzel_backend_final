import { AppDataSource } from "../data-source";
import { FavoriteFilms } from "../entities/FavoriteFilms";
import { Users } from "../entities/Users";
import { TmdbService } from "./Tmdb.service";

export class FavoriteFilmsService {
  private favoriteFilmRepository = AppDataSource.getRepository(FavoriteFilms);
  private tmdbService = new TmdbService();

  async addFavoriteFilm(userId: number, movieId: number): Promise<FavoriteFilms> {
    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({ where: { user_id: userId } });
    if (!user) throw new Error("User not found");

    const existingFavorite = await this.favoriteFilmRepository.findOne({
      where: { user, movie_id: movieId },
    });
    if (existingFavorite) throw new Error("Film has already been favorited by the user");
    
    const favoriteFilm = new FavoriteFilms();
    favoriteFilm.movie_id = movieId;
    favoriteFilm.user = user;

    return await this.favoriteFilmRepository.save(favoriteFilm);
  }

  async removeFavoriteFilm(userId: number, movieId: number): Promise<void> {
  
    const favoriteFilm = await this.favoriteFilmRepository.findOne({
      where: { user: { user_id: userId }, movie_id: movieId },
    });
  
    if (!favoriteFilm) {
      throw new Error("Favorite film not found");
    }
  
    await this.favoriteFilmRepository.remove(favoriteFilm);
  }
  

  async getFavoriteFilmIdsByUser(userId: number): Promise<number[]> {
    const favoriteFilms = await this.favoriteFilmRepository.find({
      where: { user: { user_id: userId } },
      select: ['movie_id']
    });

    return favoriteFilms.map(film => film.movie_id);
  }

  async getFavoriteFilmDetailsByUser(userId: number): Promise<any[]> {
    try {
      const movieIds = await this.getFavoriteFilmIdsByUser(userId);
      const movieDetails = await Promise.all(movieIds.map(id => this.tmdbService.getMovieDetails(id)));
      return movieDetails;
    } catch (error) {
      console.error('Error fetching favorite film details:', error);
      throw new Error('Unable to fetch favorite film details');
    }
  }

  async getFavoriteFilmsByGenre(userId: number, genreId: number): Promise<any[]> {
    try {
      const movieIds = await this.getFavoriteFilmIdsByUser(userId);
      const moviesByGenre = await Promise.all(
        movieIds.map(async (id) => {
          const movieDetails = await this.tmdbService.getMovieDetails(id);
          if (movieDetails.genres.some((genre: any) => genre.id === genreId)) {
            return movieDetails;
          }
        })
      );
      return moviesByGenre.filter(Boolean); 
    } catch (error) {
      console.error('Error fetching favorite films by genre:', error);
      throw new Error('Unable to fetch favorite films by genre');
    }
  }

  async searchFavoriteFilms(userId: number, query: string): Promise<any[]> {
    try {
      const movieIds = await this.getFavoriteFilmIdsByUser(userId);
      const searchResults = await Promise.all(
        movieIds.map(async (id) => {
          const movieDetails = await this.tmdbService.getMovieDetails(id);
          if (movieDetails.title.toLowerCase().includes(query.toLowerCase())) {
            return movieDetails;
          }
        })
      );
      return searchResults.filter(Boolean);
    } catch (error) {
      throw new Error('Unable to search favorite films');
    }
  }
  generateShareLink(userId: number): string {
    const shareLink = `http://localhost:3000/movie/share/${userId}`;   
    return shareLink;
  }

  async getSharedFavorites(userId: number): Promise<any[]> {
    return this.getFavoriteFilmDetailsByUser(userId);
  }
}
