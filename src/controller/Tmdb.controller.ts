import { TmdbService } from '../services/Tmdb.service';
import { Request, Response } from 'express';

export class TmdbController {
  static async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      const { page } = req.query;
      const tmdbService = new TmdbService();
      const movies = await tmdbService.getAllMovies(Number(page) || 1);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: "Error fetching movies: " + error });
    }
  }

  static async getMovieById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const tmdbService = new TmdbService();
      const movie = await tmdbService.getMovieById(Number(id));
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      res.status(500).json({ error: "Error fetching movie: " + error });
    }
  }

  static async getMoviesByGenre(req: Request, res: Response): Promise<void> {
    try {
      const { genreId } = req.params;
      const { page } = req.query;
      const tmdbService = new TmdbService();
      const movies = await tmdbService.getMoviesByGenre(Number(genreId), Number(page) || 1);
      if (movies.results && movies.results.length > 0) {
        res.status(200).json(movies);
      } else {
        res.status(404).json({ error: 'No movies found for this genre' });
      }
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      res.status(500).json({ error: "Error fetching movies by genre: " + error });
    }
  }
  static async getMovieByName(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      const { page } = req.query;
      const tmdbService = new TmdbService();
      const movies = await tmdbService.getMovieByName(String(query), Number(page) || 1);
      if (movies.results && movies.results.length > 0) {
        res.status(200).json(movies);
      } else {
        res.status(404).json({ error: 'No movies found with that name' });
      }
    } catch (error) {
      console.error('Error fetching movie by name:', error);
      res.status(500).json({ error: "Error fetching movie by name: " + error });
    }
  }
  static async getGenres(req: Request, res: Response): Promise<void> {
    try {
      const tmdbService = new TmdbService();
      const genres = await tmdbService.getGenres();
      res.status(200).json(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
      res.status(500).json({ error: "Error fetching genres: " + error });
    }
  }
}
