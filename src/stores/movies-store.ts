import { makeAutoObservable, observable, action } from 'mobx';
import getMovies from '../api-calls/get-movies';
import { Movie } from '../models/movie';


export class MoviesStore {
  movies: Movie[] = [];
  popular: Movie[] = [];
  upcoming: Movie[] = [];
  favoriteMovies: { id: number, title: string }[] = [];

  constructor() {
    makeAutoObservable(this, {
      movies: observable,
      popular: observable,
      upcoming: observable,
      addFavorite: action,
      removeFavorite: action,
      getFavoritesFromStorage: action,
    });
  }

  async fetchMovies(type: string) {
    const result = await getMovies(type);
    if (result.results && type === 'now_playing')
      this.movies = result.results;
    if (result.results && type === 'popular')
      this.popular = result.results;
    if (result.results && type === 'upcoming')
      this.upcoming = result.results;
  }

  getFavoritesFromStorage() {
    this.favoriteMovies = [...this.favoriteMovies, ...this.movies.filter(movie => !this.favoriteMovies.some(item => item.id === movie.id) && localStorage.getItem(JSON.stringify(movie.id)))];
    this.favoriteMovies = [...this.favoriteMovies, ...this.popular.filter(movie => !this.favoriteMovies.some(item => item.id === movie.id) && localStorage.getItem(JSON.stringify(movie.id)))];
    this.favoriteMovies = [...this.favoriteMovies, ...this.upcoming.filter(movie => !this.favoriteMovies.some(item => item.id === movie.id) && localStorage.getItem(JSON.stringify(movie.id)))];
  }

  addFavorite(id: number, title: string) {
    localStorage.setItem(JSON.stringify(id), JSON.stringify(title));
    this.favoriteMovies.push({ id: id, title: title });
  }

  removeFavorite(id: number) {
    localStorage.removeItem(JSON.stringify(id));
    this.favoriteMovies = this.favoriteMovies.filter(item => item.id !== id);
  }
}

const moviesStore = new MoviesStore();

export default moviesStore;