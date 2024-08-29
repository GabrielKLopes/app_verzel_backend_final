import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { loginRoutes } from "./authentication.routes";
import { TmdbController } from "../controller/Tmdb.controller";
import { FavoriteController } from "../controller/FavoriteFilm.controller";
import { authorizationMiddleware } from "../middleware/authorization.middleware";

export const routes = Router();

routes.use("/session", loginRoutes);

// User
routes.post("/session/user/register", UserController.createUser);
routes.get('/session/user', authorizationMiddleware, UserController.getAllUsers);

// TMDB
routes.get("/movies", TmdbController.getAllMovies);
routes.get('/movies/:id', TmdbController.getMovieById);
routes.get('/movies/genre/:genreId', TmdbController.getMoviesByGenre);
routes.get('/movie/search', TmdbController.getMovieByName); 
routes.get('/genres', TmdbController.getGenres);

// Favorite a movie
routes.post('/movies/favorite', authorizationMiddleware, FavoriteController.addFavorite);
routes.delete('/movies/favorite/:id', authorizationMiddleware, FavoriteController.removeFavorite);
routes.get('/movie/favorite', authorizationMiddleware, FavoriteController.getFavoritesByUser);
routes.get('/movie/favorite/genre/:genreId', authorizationMiddleware, FavoriteController.getFavoritesByGenre);
routes.get('/movie/favorite/search', authorizationMiddleware, FavoriteController.searchFavorites);
routes.get("/movie/share", authorizationMiddleware, FavoriteController.generateShareLink);

routes.get("/movie/share/:userId", FavoriteController.getSharedFavorites);