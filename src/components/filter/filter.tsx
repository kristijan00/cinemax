import React from 'react';
import styles from './filter.module.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface Props {
  setGenreSelection(genre: number): void;
  clear(): void;
}

const Filter: React.FC<Props> = props => {

  const genres = [{id:27, name: 'action'}, {id:14, name: 'adventure'}, {id:18, name: 'drama'}];

  return (
    <div className={styles.filter}>
      <div className={styles.logoContainer}>
        <FilterAltIcon />
        <h3>FILTERS</h3>
      </div>
      <DropdownButton className={styles.dropdown} variant="dark" id="dropdown-basic-button" title="Genre">
        {
          genres.map((item, index) => <Dropdown.Item key={Math.random() * index} onClick={() => props.setGenreSelection(item.id)}>{item.name}</Dropdown.Item>)
        }
      </DropdownButton>
      <p onClick={() => props.clear()}>Clear</p>
    </div>
  );
};

export default Filter;