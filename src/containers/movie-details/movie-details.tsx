import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { Movie } from '../../models/movie';
import moviesStore from '../../stores/movies-store';
import styles from './movie-details.module.css';
import { observer } from 'mobx-react-lite';
import Footer from '../../components/footer/footer';
import MovieCard from '../../components/movie-card/movie-card';

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();
  const params = useParams();

  useEffect(() => {
    params.id && setMovie(moviesStore.movies.find(movie => params && params.id && movie.id === +params.id) || moviesStore.popular.find(movie => params && params.id && movie.id === +params.id) || moviesStore.upcoming.find(movie => params && params.id && movie.id === +params.id));
  }, [params.id]);

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.container}>
        {
          movie ?
            <>
              <div className={styles.leftSide}>
                <MovieCard movieId={movie.id} movieTitle={movie.title} picture={movie.poster_path}/>
              </div>
              <div className={styles.rightSide}>
                <h2>{movie.title}</h2>
                <p>Release date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>Overview: {movie.overview}</p>
              </div>
            </>
            : null
        }
      </div>
      <Footer />
    </div>
  );
};

export default observer(MovieDetails);