import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moviesStore from '../../stores/movies-store';
import { observer } from 'mobx-react-lite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
}

const Header: React.FC<Props> = props => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const resizeHandler = () => {
    setIsMobile(window.innerWidth < 1100);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <div className={styles.wrap}>
      <h1 onClick={() => navigate('/home')}>Cinemax</h1>
      <div className={styles.rightSide}>
        <Link className={styles.link} to="/home">Home</Link>
        <Link className={styles.link} to="/discover">Discover</Link>
        <div className={styles.searchField} >
          <input type="text" placeholder={'Search movies'} value={props.searchText ? props.searchText : ''} onChange={e => props.setSearchText(e.target.value!)}></input>
          <ul>
            {
              props.searchText && props.searchText.length > 0 ?
                moviesStore.movies.filter(movie => movie.title.toLocaleLowerCase().includes(props.searchText.toLocaleLowerCase()))
                  .map(item => <li onClick={() => navigate(`/movie-details/${item.id}`)} key={item.id}><p>{item.title}</p></li>)
                : null
            }
          </ul>
        </div>
        <DropdownButton className={styles.dropdown} size={isMobile ? 'sm' : undefined} variant="dark" id="dropdown-basic-button" title="Favorites">
          {
            moviesStore.favoriteMovies && moviesStore.favoriteMovies.length > 0 ?
              moviesStore.favoriteMovies.map(item => <Dropdown.Item onClick={() => navigate(`/movie-details/${item.id}`)} key={item.id}>{item.title}</Dropdown.Item>)
              :
              <Dropdown.Item>No favorite movies</Dropdown.Item>
          }
        </DropdownButton>
        {
          isMobile ?
            <div className={`${styles.burgerMenu} ${isBurgerOpen ? styles.open : ''}`} onClick={() => setIsBurgerOpen(curr => !curr)}>
              <div></div>
            </div>
            :
            null
        }
      </div>
      {
        isMobile ?
          <div className={isBurgerOpen ? styles.mobileMenu : styles.hidden}>
            <div className={styles.linkContainer}>
              <div>
                <Link className={styles.linkAlt} to="/home">Home</Link>
                <HomeIcon color="action"/>
              </div>
              <div>
                <Link className={styles.linkAlt} to="/discover">Discover</Link>
                <SearchIcon color="action"/>
              </div>
            </div>
          </div>
          : null
      }
    </div>
  );
};

export default observer(Header);