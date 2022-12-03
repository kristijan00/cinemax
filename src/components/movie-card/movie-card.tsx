import React from 'react';
import moviesStore from '../../stores/movies-store';
import styles from './movie-card.module.css';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  picture: string;
  movieId: number;
  movieTitle: string;
  onClick?: (e: React.MouseEvent) => void;
}

const MovieCard: React.FC<Props> = props => {

  return (
    <div className={styles.wrap}>
      <div id="icon" className={styles.favoriteIcon} onClick={() => moviesStore.favoriteMovies.some(movie => movie.id === props.movieId) ? runInAction(() => moviesStore.removeFavorite(props.movieId)) : runInAction(() => moviesStore.addFavorite(props.movieId, props.movieTitle))}>
        {
          moviesStore.favoriteMovies.some(item => item.id === props.movieId) ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />
        }
      </div>
      <div className={styles.container} onClick={props.onClick}>
        <img src={'http://image.tmdb.org/t/p/w500' + props.picture} alt="movie-poster" />
      </div>
    </div>
  );
};

export default observer(MovieCard);