import { Request, Response } from 'express';
import { FavoriteFilmsService } from '../services/FavoriteFilms.service';

export class FavoriteController {
  static async addFavorite(req: Request, res: Response) {
    try {
      const { movie_id } = req.body;
      const userId = (req as any).user_id; 

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const favoriteFilmsService = new FavoriteFilmsService();
      const favoriteFilm = await favoriteFilmsService.addFavoriteFilm(userId, movie_id);

      res.status(201).json(favoriteFilm);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async removeFavorite(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const userId = (req as any).user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      if (!id) {
        return res.status(400).json({ message: "Movie ID is required" });
      }

      const favoriteFilmsService = new FavoriteFilmsService();
      await favoriteFilmsService.removeFavoriteFilm(userId, Number(id)); 

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
  static async getFavoritesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user_id;

      if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      const favoriteFilmsService = new FavoriteFilmsService();
      const filmDetails = await favoriteFilmsService.getFavoriteFilmDetailsByUser(userId);
      res.status(200).json(filmDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getFavoritesByGenre(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user_id;
      const { genreId } = req.params;
  
      if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }
  
      const favoriteFilmsService = new FavoriteFilmsService();
      const filmsByGenre = await favoriteFilmsService.getFavoriteFilmsByGenre(userId, Number(genreId));
      res.status(200).json(filmsByGenre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  static async searchFavorites(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user_id;
      const { query } = req.query;
  
      if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }
  
      const favoriteFilmsService = new FavoriteFilmsService();
      const searchResults = await favoriteFilmsService.searchFavoriteFilms(userId, query as string);
      res.status(200).json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async generateShareLink(req: Request, res: Response) {
    try {
      const userId = (req as any).user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const favoriteFilmsService = new FavoriteFilmsService();
      const shareLink = favoriteFilmsService.generateShareLink(userId);

      res.status(200).json({ shareLink });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getSharedFavorites(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const favoriteFilmsService = new FavoriteFilmsService();
      const sharedFavorites = await favoriteFilmsService.getSharedFavorites(Number(userId));

      res.status(200).json(sharedFavorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
