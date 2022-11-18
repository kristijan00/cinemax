import { Movie } from '../models/movie';
import { Result } from '../models/result'; 

const getMovies = async (type: string): Promise<Result<Movie[]>> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${type}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
      },
    });
    return await response.json();   
  } catch (error) {
    return {
      error: 'Something went wrong!',
    };
  }
};

export default getMovies;