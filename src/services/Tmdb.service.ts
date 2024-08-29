import axios from "axios";

export class TmdbService {
  private baseUrl: string = "https://api.themoviedb.org/3";
  private apiKey: string = "5bbf99af962447a64b4fc7c828ca1996";

  async getAllMovies(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const url = `${this.baseUrl}/discover/movie`;
      const response = await axios.get(url, {
        params: {
          api_key: this.apiKey,
          page: page,
          language: "pt-BR",
        },
      });

      const movies = response.data.results.slice(0, limit);

      const moviesWithDetails = await Promise.all(
        movies.map(async (movie: any) => {
          const movieDetailsUrl = `${this.baseUrl}/movie/${movie.id}`;
          const creditsUrl = `${this.baseUrl}/movie/${movie.id}/credits`;
          const videosUrl = `${this.baseUrl}/movie/${movie.id}/videos`;

          const [movieDetailsResponse, creditsResponse, videosResponse] = await Promise.all([
            axios.get(movieDetailsUrl, {
              params: { api_key: this.apiKey, language: "pt-BR" }, 
            }),
            axios.get(creditsUrl, {
              params: { api_key: this.apiKey, language: "pt-BR" },
            }),
            axios.get(videosUrl, {
              params: { api_key: this.apiKey, language: "pt-BR" },
            }),
          ]);

          const trailer = videosResponse.data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');

          return {
            ...movie,
            budget: movieDetailsResponse.data.budget,
            revenue: movieDetailsResponse.data.revenue,
            cast: creditsResponse.data.cast,
            crew: creditsResponse.data.crew,
            trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
          };
        })
      );

      return { ...response.data, results: moviesWithDetails };
    } catch (error) {
      throw new Error("Error fetching movie list: " + error);
    }
  }

  async getMovieById(movieId: number): Promise<any> {
    try {
      const url = `${this.baseUrl}/movie/${movieId}`;
      const response = await axios.get(url, {
        params: {
          api_key: this.apiKey,
          language: "pt-BR",
        },
      });
  
      const creditsUrl = `${this.baseUrl}/movie/${movieId}/credits`;
      const creditsResponse = await axios.get(creditsUrl, {
        params: {
          api_key: this.apiKey,
          language: "pt-BR",
        },
      });
  
      const videosUrl = `${this.baseUrl}/movie/${movieId}/videos`;
      const videosResponse = await axios.get(videosUrl, {
        params: {
          api_key: this.apiKey,
          language: "pt-BR",
        },
      });
  
      const trailer = videosResponse.data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
  
      return {
        ...response.data,
        cast: creditsResponse.data.cast,
        crew: creditsResponse.data.crew,
        trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
      };
    } catch (error) {
      console.error(`Error fetching movie with ID ${movieId}:`, error);
      throw new Error(`Error fetching movie: ${error}`);
    }
  }
  

  async getMoviesByGenre(genreId: number, page: number = 1, limit: number = 10, existingMovieIds: number[] = []): Promise<any> {
    try {
      const url = `${this.baseUrl}/discover/movie`;
      const response = await axios.get(url, {
        params: {
          api_key: this.apiKey,
          with_genres: genreId,
          page: page,
          language: "pt-BR", 
        },
      });

      const uniqueMovies = response.data.results.filter((movie: any) => !existingMovieIds.includes(movie.id));
      const limitedMovies = uniqueMovies.slice(0, limit);

      return { ...response.data, results: limitedMovies };
    } catch (error) {
      throw new Error("Error fetching movies by genre: " + error);
    }
  }
  async getMovieDetails(movieId: number): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/movie/${movieId}`, {
        params: {
          api_key: this.apiKey,
          language: 'pt-BR' 
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Unable to fetch movie details');
    }
  }
  async getMovieByName(query: string, page: number = 1, limit: number = 10): Promise<any> {
    try {
      const url = `${this.baseUrl}/search/movie`;
      const response = await axios.get(url, {
        params: {
          api_key: this.apiKey,
          query: query,
          page: page,
          language: "pt-BR",
        },
      });

      const movies = response.data.results.slice(0, limit);

      return { ...response.data, results: movies };
    } catch (error) {
      throw new Error("Error fetching movie by name: " + error);
    }
  }
  async getGenres(): Promise<any> {
    try {
      const url = `${this.baseUrl}/genre/movie/list`;
      const response = await axios.get(url, {
        params: {
          api_key: this.apiKey,
          language: "pt-BR", 
        },
      });

      return response.data.genres; 
    } catch (error) {
      throw new Error("Error fetching genres: " + error);
    }
  }
  
}
