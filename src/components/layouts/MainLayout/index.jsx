import React from 'react';
import styles from './mainLayout.module.less';
import { Link } from 'gatsby'

const MainLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.name}><span className={styles.nameAccent}>D</span>erek <span className={styles.nameAccent}>S</span>paulding</h1>
    </header>
    <nav className={styles.navContainer}>
      <Link className={styles.navLink} activeClassName={styles.active} to="/">About</Link>
      <Link className={styles.navLink} activeClassName={styles.active} to="/blog">Blog</Link>
      <Link className={styles.navLink} activeClassName={styles.active} to="/contact">Contact</Link>
    </nav>
    <main className={styles.content}>
      {children}
    </main>
  </div>
)

export default MainLayout;