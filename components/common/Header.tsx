import React from 'react';
import Link from 'next/link';
import { GrNavigate } from 'react-icons/gr';
import styles from '../../styles/header.module.scss';

interface Props {
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          <GrNavigate />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;
