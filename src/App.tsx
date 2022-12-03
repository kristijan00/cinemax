import React, { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './containers/home/home';
import moviesStore from './stores/movies-store';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import MovieDiscover from './containers/movie-discover/movie-discover';
import MovieDetails from './containers/movie-details/movie-details';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (moviesStore.movies.length === 0) {
      runInAction(async () => {
        await Promise.all([
          moviesStore.fetchMovies('now_playing'),
          moviesStore.fetchMovies('popular'),
          moviesStore.fetchMovies('upcoming'),
        ]);
      }).then(() => runInAction(() => moviesStore.getFavoritesFromStorage()));
    }
  }, []);

  return (
    <>
      <Routes >
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<MovieDiscover />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default observer(App);
