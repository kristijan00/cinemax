import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import styles from './home.module.css';
import { observer } from 'mobx-react-lite';
import backgroundPicture from '../../assets/background-picture.jpg';
import Footer from '../../components/footer/footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('');

  return (
    <div className={styles.wrap} style={{ backgroundImage: `url(${backgroundPicture})` }}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>All of your streaming platforms in one app.</h1>
          <h3>Get personalized offers for movies and series</h3>
          <button onClick={() => navigate('/discover')}>Discover</button>
        </div>
        <div className={styles.rightSide}>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Home);