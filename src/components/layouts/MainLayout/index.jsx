import React from 'react';
import styles from './mainLayout.module.less';
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const MainLayout = ({ children, title }) => (
  <div className={styles.wrapper}>
    <Helmet htmlAttributes={{"lang": "en"}}>
      <title>{title ? `${title} - Derek Spaulding` : 'Derek Spaulding'}</title>
    </Helmet>

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