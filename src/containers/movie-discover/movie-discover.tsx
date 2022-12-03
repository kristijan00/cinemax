import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import moviesStore from '../../stores/movies-store';
import styles from './movie-discover.module.css';
import { observer } from 'mobx-react-lite';
import MovieCard from '../../components/movie-card/movie-card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../../components/footer/footer';
import Filter from '../../components/filter/filter';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const MovieDiscover: React.FC = () => {
  const [genreSelection, setGenreSelection] = useState<number>();
  const navigate = useNavigate();

  const clear = () => {
    setGenreSelection(undefined);
  };

  return (
    <div className={styles.wrap}>
      <Header />
      <Filter clear={clear} setGenreSelection={(genre) => setGenreSelection(genre)} />
      {
        genreSelection !== undefined ?
          <div className={styles.filteredList}>
            {
              moviesStore.movies.filter(movie => genreSelection !== undefined && movie.genre_ids && movie.genre_ids.some(genre => genre === genreSelection)).map(item =>
                <MovieCard key={item.id} onClick={() => navigate(`/movie-details/${item.id}`)} movieId={item.id} movieTitle={item.title} picture={item.poster_path} />)
            }
          </div>
          :
          <div className={styles.container}>
            <div>
              <h2>New in the cinemas</h2>
              <Carousel className={styles.carousel} swipeable responsive={responsive}>
                {
                  moviesStore.movies ?
                    moviesStore.movies.map(item => <MovieCard onClick={() => navigate(`/movie-details/${item.id}`)} movieTitle={item.title} movieId={item.id} picture={item.poster_path} key={item.id} />)
                    :
                    null
                }
              </Carousel>;
            </div>
            <div>
              <h2>Popular</h2>
              <Carousel className={styles.carousel} swipeable responsive={responsive}>
                {
                  moviesStore.popular ?
                    moviesStore.popular.map(item => <MovieCard onClick={() => navigate(`/movie-details/${item.id}`)} movieTitle={item.title} movieId={item.id} picture={item.poster_path} key={item.id} />)
                    :
                    null
                }
              </Carousel>;
            </div>
            <div>
              <h2>Upcoming</h2>
              <Carousel className={styles.carousel} swipeable responsive={responsive}>
                {
                  moviesStore.upcoming ?
                    moviesStore.upcoming.map(item => <MovieCard onClick={() => navigate(`/movie-details/${item.id}`)} movieTitle={item.title} movieId={item.id} picture={item.poster_path} key={item.id} />)
                    :
                    null
                }
              </Carousel>;
            </div>
          </div>

      }
      <Footer />
    </div>
  );
};

export default observer(MovieDiscover);