import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <p>Copyright &copy; Cinemax. All rights reserved.</p>
    </div>
  );
};

export default Footer;